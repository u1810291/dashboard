import http, { getAuthHeader } from './http';

export function saveConfiguration(token, configurations) {
  return http.patch(
    '/api/v1/merchants/me',
    { configurations },
    {
      headers: { ...getAuthHeader(token) },
    },
  );
}

export function getMerchant(token) {
  return http.get('/api/v1/merchants/me', {
    headers: { ...getAuthHeader(token) },
  });
}

export function putMerchants(token, data) {
  return http.patch('/api/v1/merchants/me', data, {
    headers: { ...getAuthHeader(token) },
  });
}

export function getIntegrationCode(token) {
  return http.get('/api/v1/merchants/integration-code', {
    headers: { ...getAuthHeader(token) },
  });
}

export function getMerchantApps(token) {
  return http.get('/api/v1/merchants/apps', {
    headers: { ...getAuthHeader(token) },
  });
}

export function uploadMerchantMedia(token, form) {
  return http.post('/v1/media', form, {
    headers: { ...getAuthHeader(token) },
  });
}
