import { http } from './http';

export function saveConfiguration(configurations) {
  return http.patch('/api/v1/merchants/me', { configurations });
}

export function getMerchant() {
  return http.get('/api/v1/merchants/me');
}

export function putMerchants(data) {
  return http.patch('/api/v1/merchants/me', data);
}

export function getMerchantApps() {
  return http.get('/api/v1/merchants/apps');
}

export function uploadMerchantMedia(form) {
  return http.post('/v1/media', form);
}

// flows api
export function getMerchantFlows(merchantId) {
  return http.get(`api/v1/merchants/${merchantId}/flows`);
}

export function getMerchantFlowById(merchantId, id) {
  return http.get(`api/v1/merchants/${merchantId}/flows/${id}`);
}

export function createMerchantFlow(merchantId, data) {
  return http.post(`api/v1/merchants/${merchantId}/flows`, data);
}

export function updateMerchantFlow(merchantId, id, data) {
  return http.patch(`api/v1/merchants/${merchantId}/flows/${id}`, data);
}

export function deleteMerchantFlow(merchantId, id) {
  return http.delete(`api/v1/merchants/${merchantId}/flows/${id}`);
}
