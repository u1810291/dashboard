import { http } from 'lib/client/http';

export function getIdentityProfile(identityId) {
  return http.get(`/api/v1/dashboard/identity/${identityId}`);
}

export function identityProfileRemove(id) {
  return http.delete(`/v1/identity/${id}`);
}
