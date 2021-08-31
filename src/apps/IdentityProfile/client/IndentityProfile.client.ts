import { http } from 'lib/client/http';
import { IdentityProfileResponse } from '../models/IdentityProfile.model';

export function getIdentityProfile(identityId: string, params: any) {
  return http.get<IdentityProfileResponse>(`/api/v1/dashboard/identity/${identityId}`, { params });
}

export function identityProfileRemove(id) {
  return http.delete(`/v1/identity/${id}`);
}
