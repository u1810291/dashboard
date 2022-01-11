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

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 * should be replaced with downloadVerificationCSV after it is fixed on BE
 */
export function downloadCSV(params) {
  return http.get('/api/v1/identities', {
    params,
    responseType: 'blob',
  });
}

export function patchVerificationDocument(verificationId, documentType, fields) {
  return http.patch(`/api/v1/dashboard/verifications/${verificationId}/documents/${documentType}/fields`, { fields });
}

export function deleteIdentity(id) {
  return http.delete(`/api/v1/identities/${id}`);
}

export function getIdentity(id, params) {
  return http.get(`/api/v1/identities/${id}?embed=verification`, { params });
}

export async function putCustomerNotes(identityId, notes) {
  return http.put(`/api/v1/dashboard/identity/${identityId}/notes`, notes);
}

export function postPdfDownloaded(identityId, verificationId) {
  return http.post(`/api/v1/dashboard/audit/identities/${identityId}/verifications/${verificationId}/pdf-downloaded`);
}
