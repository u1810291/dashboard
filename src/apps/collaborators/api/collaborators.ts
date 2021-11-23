import { http } from 'lib/client/http';
import { Collaborator, IUser, UserId } from 'models/Collaborator.model';
import { MerchantId } from 'models/Merchant.model';

export function getCollaborators(merchantId: MerchantId) {
  return http.get<Collaborator[]>(`/api/v1/merchants/${merchantId}/collaborators`);
}

export function getCollaborator(merchantId: MerchantId, id: UserId) {
  return http.get<Collaborator[]>(`/api/v1/merchants/${merchantId}/collaborators/${id}`);
}

export function postCollaborators(merchantId: MerchantId, data: Partial<Collaborator>) {
  return http.post<Collaborator[]>(`/api/v1/merchants/${merchantId}/collaborators`, data);
}

export function deleteCollaborators(merchantId: MerchantId, id: UserId) {
  return http.delete<Collaborator[]>(`/api/v1/merchants/${merchantId}/collaborators/${id}`);
}

export function patchCollaborators(merchantId: MerchantId, id: UserId, data: Partial<Collaborator>) {
  return http.patch<Collaborator[]>(`/api/v1/merchants/${merchantId}/collaborators/${id}`, data);
}

export function userBlock(id: UserId) {
  return http.patch<IUser>(`/api/v1/dashboard/user/${id}/block`);
}

export function userUnblock(id: UserId) {
  return http.patch<IUser>(`/api/v1/dashboard/user/${id}/unblock`);
}
