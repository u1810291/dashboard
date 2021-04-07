import { get, set } from 'lodash';
import { BiometricTypes } from 'models/Biometric.model';
import { http } from './http';

export function getIdentities(params) {
  return http.get('/v1/identities', { params });
}

export function downloadCSV(params) {
  return http.get('/v1/identities', {
    params,
    responseType: 'blob',
  });
}

export function getIdentitiesCount(params) {
  return http.get('/v1/identities/count', { params });
}

export function patchIdentity(id, data) {
  return http.patch(`/v1/identities/${id}`, data);
}

export function deleteIdentity(id) {
  return http.delete(`/v1/identities/${id}`);
}

function getDocuments(id) {
  return http.getAuthorized(`/v1/identities/${id}/documents`);
}

async function getDocumentPictures(id) {
  return http.getAuthorized(`/v1/documents/${id}/pictures`);
}

async function getDocumentsFullData(id) {
  const { data } = await getDocuments(id);

  return Promise.all(
    data.map(async (document) => {
      const payload = await getDocumentPictures(document.id);
      return {
        ...document,
        pictures: payload.data,
      };
    }));
}

export function getIdentity(id, params) {
  return http.get(`/v1/identities/${id}?embed=verification,documents`, { params });
}

export async function getIdentityWithNestedData(id, params) {
  const { data } = await getIdentity(id, params);
  const identity = {
    ...data,
    originalIdentity: data,
  };
  if (!data._embedded || !data._embedded.verification) {
    identity.documents = await getDocumentsFullData(id);
  }
  const livenessStep = data._embedded.verification.steps.find((step) => step.id === BiometricTypes.liveness);
  let videoUrl = get(livenessStep, 'data.videoUrl');

  if (livenessStep) {
    if (!videoUrl) {
      const videoLink = get(data, '_links.video.href');
      if (videoLink) {
        const video = await http.getAuthorized(videoLink);
        const fileUrl = get(video, 'data._links.file.href');
        if (fileUrl) {
          videoUrl = http.authorizedUrlFrom(fileUrl);
        }
      }
    }
    (identity._embedded.verification.steps || []).forEach((step, index) => {
      if (step.id === BiometricTypes.liveness) {
        set(identity, `_embedded.verification.steps[${index}].data.videoUrl`, videoUrl);
      }
    });
  }

  return identity;
}

export async function getVerificationData(id) {
  const { data } = await http.get(`/v1/identities/demo/${id}`);
  return {
    id,
    ...data,
    originalIdentity: data,
  };
}

export function patchDocument(id, fields) {
  return http.patch(`/v1/documents/${id}`, { fields });
}
