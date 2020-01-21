import { http } from './http';

export function getPlan(id) {
  return http.get(`api/v1/plans/${id}`);
}

export function setPlan(planId) {
  return http.put(`/api/v1/merchants/me/billing/providers/stripe/plans/${planId}`, {});
}

export function getPlans() {
  return http.get('api/v1/plans?sort=order');
}

export function getCurrentPlan() {
  return http.get('/api/v1/merchant/me/billing/plan-details');
}
export function cancelPlan() {
  return http.delete('/api/v1/merchant/me/billing');
}

export function addProvider(source) {
  return http.put('/api/v1/merchants/me/billing/providers/stripe', { source });
}
