import { http } from 'lib/client/http';
import { IVerificationWorkflow } from 'models/Verification.model';

export function getVerificationList(identityId: string, params: any) {
  return http.get(`/api/v1/dashboard/identity/${identityId}/verification`, { params });
}

export function getVerification(verificationId: string, params: any) {
  return http.get<IVerificationWorkflow>(`/api/v3/dashboard/verification/${verificationId}`, { params });
}

export function verificationStatusUpdate(verificationId: string, status: string, agentNote?: string) {
  const url = `/api/v1/dashboard/verifications/${verificationId}/status`;
  if (typeof agentNote === 'string') {
    return http.put(url, { status, agentNote });
  }

  return http.put(url, { status });
}

export function deleteVerification(verificationId: string) {
  return http.delete(`/api/v1/dashboard/verification/${verificationId}`);
}

export function getVerificationWebhook(id: string, params: any) {
  return http.get(`/api/v1/dashboard/verification/${id}/webhook`, { params });
}

export function patchVerificationDocument(verificationId: string, documentType: string, fields: Record<string, unknown>) {
  return http.patch(`/api/v1/dashboard/verifications/${verificationId}/documents/${documentType}/fields`, { fields });
}
