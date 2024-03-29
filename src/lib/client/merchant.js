import { http } from 'lib/client/http';

export function saveConfiguration(configurations) {
  return http.patch('/api/v1/merchants/me', { configurations });
}

export function getMerchant() {
  return http.get('/api/v1/merchants/me');
}

export function getMerchantApps() {
  return http.get('/api/v1/merchants/apps');
}

export function uploadMerchantMedia(form) {
  return http.post('/api/v1/media', form);
}

export function patchOnboardingProgress(onboardingSteps) {
  return http.patch('/api/v1/dashboard/user/onboarding-steps', { onboardingSteps });
}

export function saveBusinessName(businessName) {
  return http.patch('/api/v1/merchants/me', { businessName });
}

export function saveSettings(settings) {
  return http.patch('/api/v1/merchants/me', { settings });
}

export function getMerchantCustomDocuments(merchantId) {
  return http.get(`/api/v1/merchants/${merchantId}/custom-documents`);
}

export function createMerchantCustomDocument(merchantId, data) {
  return http.post(`/api/v1/merchants/${merchantId}/custom-documents`, data);
}

export function updateCustomDocument(merchantId, type, data) {
  return http.patch(`/api/v1/merchants/${merchantId}/custom-documents/${type}`, data);
}

export function deleteCustomDocument(merchantId, type) {
  return http.delete(`/api/v1/merchants/${merchantId}/custom-documents/${type}`);
}

// flows api
export function getMerchantFlows(merchantId, params) {
  return http.get(`/api/v1/merchants/${merchantId}/flows`, { params });
}

export function createMerchantFlow(merchantId, data) {
  return http.post(`/api/v1/merchants/${merchantId}/flows`, data);
}

export function updateMerchantFlow(merchantId, id, data) {
  return http.patch(`/api/v1/merchants/${merchantId}/flows/${id}`, data);
}

export function deleteMerchantFlow(merchantId, id) {
  return http.delete(`/api/v1/merchants/${merchantId}/flows/${id}`);
}
