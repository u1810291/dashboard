import { http } from 'lib/client/http';

export function getVerificationList(identityId: string) {
  return http.get(`/api/v1/dashboard/identity/${identityId}/verification`);
}

export function getVerification(verificationId) {
  return http.get(`/api/v1/dashboard/verification/${verificationId}`);
}

export function verificationStatusUpdate(verificationId, status) {
  return http.put(`/api/v1/dashboard/verifications/${verificationId}/status`, { status });
}

export function deleteVerification(identityId, verificationId) {
  return http.delete(`/api/v1/dashboard/identity/${identityId}/verification/${verificationId}`);
}
