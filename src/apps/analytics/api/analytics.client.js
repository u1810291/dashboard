import { http } from 'lib/client/http';

export function getMetrics() {
  return http.get('api/v1/merchants/me/identities/analytics/counts');
}

export function getStatistics(params) {
  return http.get('api/v1/merchants/me/identities/analytics/stats', { params });
}

export function getVerificationsCount(params) {
  return http.get('api/v1/merchants/me/identities/analytics/verifications/count', { params });
}

export function getDocumentsCount(params) {
  return http.get('api/v1/merchants/me/identities/analytics/documents', { params });
}

export function getDevicesStatistics(params) {
  return http.get('api/v1/merchants/me/identities/analytics/devices', { params });
}

export function getIpCheckStatistics(params) {
  return http.get('api/v1/merchants/me/identities/analytics/cities', { params });
}
