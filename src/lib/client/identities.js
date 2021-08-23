import { get, set } from 'lodash';
import { BiometricTypes } from 'models/Biometric.model';
import { http } from 'lib/client/http';

export function getVerifications(params) {
  return http.get('/api/v1/dashboard/verification', { params });
}

export function getVerificationsCount(params) {
  return http.get('/api/v1/dashboard/verification/count', { params });
}

export function downloadVerificationCSV(params) {
  return http.get('/api/v1/dashboard/verification/export/csv', {
    params,
    responseType: 'blob',
  });
}

export function deleteVerification(identityId, verificationId) {
  return http.delete(`/api/v1/dashboard/identity/${identityId}/verification/${verificationId}`);
}

export function getIdentityVerifications(identityId) {
  return http.get(`/api/v1/dashboard/identity/${identityId}/verification`);
}

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export function getIdentities(params) {
  return http.get('/v1/identities', { params });
}

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export function downloadCSV(params) {
  return http.get('/v1/identities', {
    params,
    responseType: 'blob',
  });
}

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
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
      videoUrl = get(data, '_links.video.href');
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
