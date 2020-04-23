import { http } from 'lib/client/http';

export function getMetrics() {
  return http.get('api/v1/merchants/me/identities/analytics/counts');
}

export function getStatistics({ period, flowId }) {
  return http.get('api/v1/merchants/me/identities/analytics/stats', {
    params: { period, flowId },
  });
}
