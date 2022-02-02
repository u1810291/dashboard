import { http } from 'lib/client/http';

export function getTemplates(params) {
  return http.get('/api/v1/dashboard/template', { params });
}
