import { http } from 'lib/client/http';

export function getVerificationHistory(identityId: string, params: any) {
  return http.get(`/api/v1/dashboard/audit/identities/${identityId}/verifications`, { params });
}

export function getVerificationEventsCount(identityId: string, params: any) {
  return http.get(`/api/v1/dashboard/audit/counts/identities/${identityId}/verifications`, { params });
}

export function saveVerificationAgentNote(identityId: string, auditId: string, params: any) {
  return http.patch(`/api/v1/dashboard/identities/${identityId}/audit/${auditId}/agentNote`, params);
}
