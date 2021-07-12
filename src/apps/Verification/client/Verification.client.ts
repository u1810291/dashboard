import { http } from 'lib/client/http';

export function getVerificationList(identityId: string, params: any) {
  return http.get(`/api/v1/dashboard/identity/${identityId}/verification`, { params });
}

export function getVerification(verificationId: string, params: any) {
  return http.get(`/api/v1/dashboard/verification/${verificationId}`, { params });
}

export function verificationStatusUpdate(verificationId, status) {
  return http.put(`/api/v1/dashboard/verifications/${verificationId}/status`, { status });
}

export function deleteVerification(verificationId: string) {
  return http.delete(`/api/v1/dashboard/verification/${verificationId}`);
}

export function getVerificationWebhook(id: string, params: any) {
  return http.get(`/api/v1/dashboard/verification/${id}/webhook`, { params });
}
