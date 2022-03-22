import { http } from 'lib/client/http';

export function getVerificationList(identityId: string, params: any) {
  return http.get(`/api/v1/dashboard/identity/${identityId}/verification`, { params });
}

export function getVerification(verificationId: string, params: any) {
  return http.get(`/api/v1/dashboard/verification/${verificationId}`, { params });
}

export function verificationStatusUpdate(verificationId: string, status: string, agentNote: string | null | undefined = undefined) {
  return http.put(`/api/v1/dashboard/verifications/${verificationId}/status`, { status, agentNote });
}

export function deleteVerification(verificationId: string) {
  return http.delete(`/api/v1/dashboard/verification/${verificationId}`);
}

export function getVerificationWebhook(id: string, params: any) {
  return http.get(`/api/v1/dashboard/verification/${id}/webhook`, { params });
}

export function patchVerificationDocument(verificationId: string, documentType: string, fields: any) {
  return http.patch(`/api/v1/dashboard/verifications/${verificationId}/documents/${documentType}/fields`, { fields });
}
