import http, { getAuthHeader } from 'lib/client/http';

export function getMetrics(token) {
  return http.get('api/v1/merchants/me/identities/analytics/counts', {
    headers: { ...getAuthHeader(token) },
  });
}

export function getStatistics(token, filter) {
  return http.get(`api/v1/merchants/me/identities/analytics/stats/${filter}`, {
    headers: { ...getAuthHeader(token) },
  });
}
