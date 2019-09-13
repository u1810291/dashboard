import http, { getAuthHeader } from './http';

export function getPlan(token, id) {
  return http.get(`api/v1/plans/${id}`, {
    headers: { ...getAuthHeader(token) },
  });
}

export function getPlans(token) {
  return http.get('api/v1/plans?sort=order', {
    headers: { ...getAuthHeader(token) },
  });
}

export function getMerchantPlan(token) {
  return http.get('/api/v1/merchant/me/billing/plan-details', {
    headers: { ...getAuthHeader(token) },
  });
}
export function cancelPlans(token) {
  return http.delete('/api/v1/merchant/me/billing', {
    headers: { ...getAuthHeader(token) },
  });
}
