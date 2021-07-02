import { get, set } from 'lodash';
import { BiometricTypes } from 'models/Biometric.model';
import { http } from 'lib/client/http';

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

export function patchVerificationDocument(verificationId, documentType, fields) {
  return http.patch(`/api/v1/dashboard/verifications/${verificationId}/documents/${documentType}/fields`, { fields });
}

export function deleteIdentity(id) {
  return http.delete(`/v1/identities/${id}`);
}

export function getIdentity(id, params) {
  return http.get(`/v1/identities/${id}?embed=verification`, { params });
}

export async function getIdentityWithNestedData(id, params) {
  const { data } = await getIdentity(id, params);
  const identity = {
    ...data,
    originalIdentity: data,
  };
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

export async function putCustomerNotes(identityId, notes) {
  return http.put(`/api/v1/dashboard/identity/${identityId}/notes`, notes);
}

export async function getVerificationData(id) {
  const { data } = await http.get(`/v1/identities/demo/${id}`);
  return {
    id,
    ...data,
    originalIdentity: data,
  };
}

export function postPdfDownloaded(identityId, verificationId) {
  return http.post(`api/v1/dashboard/audit/identities/${identityId}/verifications/${verificationId}/pdf-downloaded`);
}
