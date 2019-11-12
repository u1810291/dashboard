import http, { getAuthHeader } from './http';

export function getPlan(token, id) {
  return http.get(`api/v1/plans/${id}`, {
    headers: { ...getAuthHeader(token) },
  });
}

export function setPlan(token, planId) {
  return http.put(`/api/v1/merchants/me/billing/providers/stripe/plans/${planId}`, {}, {
    headers: { ...getAuthHeader(token) },
  });
}

export function getPlans(token) {
  return http.get('api/v1/plans?sort=order', {
    headers: { ...getAuthHeader(token) },
  });
}

export function getCurrentPlan(token) {
  return http.get('/api/v1/merchant/me/billing/plan-details', {
    headers: { ...getAuthHeader(token) },
  });
}
export function cancelPlan(token) {
  return http.delete('/api/v1/merchant/me/billing', {
    headers: { ...getAuthHeader(token) },
  });
}

export function addProvider(token, source) {
  return http.put('/api/v1/merchants/me/billing/providers/stripe', { source }, {
    headers: { ...getAuthHeader(token) },
  });
}
