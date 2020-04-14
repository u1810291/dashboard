import { http } from 'lib/client/http';

export function getMetrics() {
  return http.get('api/v1/merchants/me/identities/analytics/counts');
}

export function getStatistics(filter) {
  return http.get('api/v1/merchants/me/identities/analytics/stats', { params: { interval: filter } });
}
