import { set, get } from 'lodash';
import http, { getAuthHeader, authorizedUrl } from './http';

export function getIdentity(token, id) {
  return http.get(`/v1/identities/${id}?embed=verification,documents`, {
    headers: { ...getAuthHeader(token) },
  });
}

function paramsSerializer(params) {
  // return qs.stringify(params, {arrayFormat: 'comma'})
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const param = params[key];
    if (Array.isArray(param)) {
      searchParams.append(key, param.join(','));
    } else if (typeof param === 'object') {
      searchParams.append(key, JSON.stringify(param));
    } else {
      searchParams.append(key, param);
    }
  });
  return searchParams.toString();
}

export function getIdentities(token, params) {
  return http.get('/v1/identities', {
    params,
    paramsSerializer,
    headers: { ...getAuthHeader(token) },
  });
}

export function getIdentitiesFile(token, params) {
  return http.get('/v1/identities', {
    params,
    paramsSerializer,
    headers: { ...getAuthHeader(token) },
    responseType: 'blob',
  });
}

export function getIdentitiesCount(token, params) {
  return http.get('/v1/identities/count', {
    params,
    paramsSerializer,
    headers: { ...getAuthHeader(token) },
  });
}

export function patchIdentity(token, id, data) {
  return http.patch(`/v1/identities/${id}`, data, {
    headers: { ...getAuthHeader(token) },
  });
}

export function deleteIdentity(token, id) {
  return http.delete(`/v1/identities/${id}`, {
    headers: { ...getAuthHeader(token) },
  });
}

function getDocuments(token, id) {
  return http.get(`/v1/identities/${id}/documents?access_token=${token}`);
}

async function getDocumentPictures(token, id) {
  return http.get(`/v1/documents/${id}/pictures?access_token=${token}`);
}

async function getDocumentsFullData(token, id) {
  return getDocuments(token, id).then(({ data }) => Promise.all(
    data.map(async (document) => {
      const payload = await getDocumentPictures(token, document.id);
      return {
        ...document,
        pictures: payload.data,
      };
    })),
  );
}

export function getIdentityWithNestedData(token, id) {
  return getIdentity(token, id).then(async ({ data }) => {
    const identity = {
      ...data,
      originalIdentity: data,
    };
    if (!data._embedded || !data._embedded.verification) {
      identity.documents = await getDocumentsFullData(token, id);
    }
    const livenessStep = data._embedded.verification.steps.find((step) => step.id === 'liveness');
    let videoUrl = get(livenessStep, 'data.videoUrl');

    if (livenessStep) {
      if (!videoUrl) {
        const videoLink = get(data, '_links.video.href');
        if (videoLink) {
          const video = await http.get(authorizedUrl(videoLink, token));
          const file = get(video, 'data._links.file.href');
          if (file) {
            videoUrl = authorizedUrl(file, token);
          }
        }
      }
      (identity._embedded.verification.steps || []).forEach((step, index) => {
        if (step.id === 'liveness') {
          set(identity, `_embedded.verification.steps[${index}].data.videoUrl`, videoUrl);
        }
      });
    }

    return identity;
  });
}

export function getVerificationData(token, id) {
  return http.get(`/v1/identities/demo/${id}`, {
    headers: { ...getAuthHeader(token) },
  }).then(async ({ data }) => ({
    id,
    ...data,
    originalIdentity: data,
  }));
}

export function patchDocument(token, id, fields) {
  return http.patch(
    `/v1/documents/${id}`,
    { fields },
    {
      headers: { ...getAuthHeader(token) },
    },
  );
}
