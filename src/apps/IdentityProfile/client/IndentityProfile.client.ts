import { http } from 'lib/client/http';

export function getIdentityProfile(identityId: string, params: any) {
  return http.get(`/api/v1/dashboard/identity/${identityId}`, { params });
}

export function identityProfileRemove(id) {
  return http.delete(`/v1/identity/${id}`);
}
