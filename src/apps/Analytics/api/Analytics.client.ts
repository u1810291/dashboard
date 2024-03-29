import { http } from 'lib/client/http';

export function getStatistics(params) {
  return http.get('/api/v1/dashboard/analytics/verification/chart', { params });
}

export function getCountStatistics(params) {
  return http.get('/api/v1/dashboard/analytics/verification/stat', { params });
}
