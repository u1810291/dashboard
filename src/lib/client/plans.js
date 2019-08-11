import http, { getAuthHeader } from './http'

export function getPlan(token, id) {
  return http.get(`api/v1/plans/${id}`, {
    headers: { ...getAuthHeader(token) }
  });
}

export function getPlans(token, page) {
  return http.get(`api/v1/plans?sort="order"&page=${page}`, {
    headers: { ...getAuthHeader(token) }
  });
}

export function cancelPlans(token) {
  return http.delete('/api/v1/merchant/me/billing', {
    headers: { ...getAuthHeader(token) }
  });
}
