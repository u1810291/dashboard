import { http } from 'lib/client/http';

export function getAgentHistory(userId, params) {
  return http.get(`api/v1/dashboard/audit/users/${userId}`, { params });
}

export function getAgentEventsCount(userId, params) {
  return http.get(`api/v1/dashboard/audit/counts/users/${userId}`, { params });
}
