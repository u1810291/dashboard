import { http } from './http';

export function getCollaborators(merchantId) {
  return http.get(`api/v1/merchants/${merchantId}/collaborators`);
}

export function getCollaborator(merchantId, id) {
  return http.get(`api/v1/merchants/${merchantId}/collaborators/${id}`);
}

export function postCollaborators(merchantId, data) {
  return http.post(`api/v1/merchants/${merchantId}/collaborators`, data);
}

export function deleteCollaborators(merchantId, id) {
  return http.delete(`api/v1/merchants/${merchantId}/collaborators/${id}`);
}

export function patchCollaborators(merchantId, id, data) {
  return http.patch(`api/v1/merchants/${merchantId}/collaborators/${id}`, data);
}
