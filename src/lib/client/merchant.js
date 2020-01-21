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
