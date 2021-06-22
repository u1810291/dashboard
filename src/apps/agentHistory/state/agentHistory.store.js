import { createTypesSequence } from 'state/store.utils';

export const AGENT_HISTORY_STORE_KEY = 'agentHistory';

export const agentHistoryActionGroups = {
  History: 'AGENT_HISTORY',
};

export const SliceNames = {
  History: 'history',
  Count: 'count',
  Filter: 'filter',
};

export const types = {
  FILTER_UPDATE: 'agent/FILTER_UPDATE',
  AGENT_HISTORY_COUNT_LOAD: 'AGENT_HISTORY_COUNT_LOAD',
  ...createTypesSequence(agentHistoryActionGroups.History),
};
