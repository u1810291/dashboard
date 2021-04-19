import { http } from 'lib/client/http';

export function getVerification() {
  return http.get('/api/v1/dashboard/review-mode/verifications');
}

export function requestSkipVerification(verificationId) {
  return http.get(`/api/v1/dashboard/review-mode/verifications/${verificationId}/skip`);
}

export function getAwaitingReviewCount() {
  return http.get('/api/v1/dashboard/review-mode/counts/verifications/awaiting');
}

export function putVerificationStatus(verificationId, status) {
  return http.put(`/api/v1/dashboard/review-mode/verifications/${verificationId}/status`, status);
}

export function patchVerificationDocument(verificationId, documentType, fields) {
  return http.patch(`/api/v1/dashboard/review-mode/verifications/${verificationId}/documents/${documentType}/fields`, fields);
}
