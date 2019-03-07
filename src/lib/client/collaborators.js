import http, { getAuthHeader } from './http'

export function getCollaborators(token, merchantId) {
  return http.get(`api/v1/merchants/${merchantId}/collaborators`, {
    headers: { ...getAuthHeader(token) }
  })
}

export function postCollaborators(token, merchantId, data) {
  return http.post(`api/v1/merchants/${merchantId}/collaborators`, data, {
    headers: { ...getAuthHeader(token) }
  })
}

export function deleteCollaborators(token, merchantId, id) {
  return http.delete(`api/v1/merchants/${merchantId}/collaborators/${id}`, {
    headers: { ...getAuthHeader(token) }
  })
}

export function patchCollaborators(token, merchantId, id, data) {
  return http.patch(`api/v1/merchants/${merchantId}/collaborators/${id}`, data, {
    headers: { ...getAuthHeader(token) }
  })
}
