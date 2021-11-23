import { http } from 'lib/client/http';
import { Serializable } from 'lib/object';
import { UserId } from 'models/Collaborator.model';
import { AgentHistoryEvent, AgentHistoryFilter } from '../models/AgentHistory.model';

export function getAgentHistory(userId: UserId, params: Serializable<AgentHistoryFilter> & { page: number }) {
  return http.get<AgentHistoryEvent[]>(`/api/v1/dashboard/audit/users/${userId}`, { params });
}

export function getAgentEventsCount(userId: UserId, params: Serializable<AgentHistoryFilter>) {
  return http.get<{ count: number }>(`/api/v1/dashboard/audit/counts/users/${userId}`, { params });
}
