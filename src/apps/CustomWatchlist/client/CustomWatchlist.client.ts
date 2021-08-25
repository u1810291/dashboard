import { http } from 'lib/client/http';

export function getVerifications(params) {
  return http.get('/api/v1/dashboard/verification', { params });
}
