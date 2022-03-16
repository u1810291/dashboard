import { http } from 'lib/client/http';
import { IdentityProfileResponse } from 'apps/IdentityProfile';
import { IdentityId } from 'models/Identity.model';

export function getIdentityProfile(identityId: string, params: any) {
  return http.get<IdentityProfileResponse>(`/api/v1/dashboard/identity/${identityId}`, { params });
}

export function identityProfileRemove(id: IdentityId) {
  return http.delete(`/api/v1/identity/${id}`);
}
