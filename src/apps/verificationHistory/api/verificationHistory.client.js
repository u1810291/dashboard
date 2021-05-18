import { http } from 'lib/client/http';

export function getVerificationHistory(identityId, params) {
  return http.get(`api/v1/dashboard/audit/identities/${identityId}/verifications`, { params });
}

export function getVerificationEventsCount(identityId, params) {
  return http.get(`api/v1/dashboard/audit/counts/identities/${identityId}/verifications`, { params });
}
