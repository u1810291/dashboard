import { Serializable } from 'lib/object';
import { filterSerialize } from 'models/Filter.model';
import { Loadable } from 'models/Loadable.model';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { AGENT_HISTORY_STORE_KEY, AgentHistoryStore, SliceNames } from './agentHistory.store';
import { AgentHistoryEvent, AgentHistoryFilter } from '../models/AgentHistory.model';

export const selectAgentHistoryStore = (state: { AGENT_HISTORY_STORE_KEY: AgentHistoryStore }): AgentHistoryStore => state[AGENT_HISTORY_STORE_KEY];

export const selectAgentHistoryFilter = createSelector<[typeof selectAgentHistoryStore], AgentHistoryFilter>(
  selectAgentHistoryStore,
  (store) => store[SliceNames.Filter],
);

export const selectAgentHistoryFilterSerialized = createSelector<[typeof selectAgentHistoryStore], Serializable<AgentHistoryFilter>>(
  selectAgentHistoryStore,
  (store) => filterSerialize(store[SliceNames.Filter]),
);

export const selectAgentHistoryTotalCount = createSelector<[typeof selectAgentHistoryStore], number>(
  selectAgentHistoryStore,
  (store) => store[SliceNames.Count],
);

export const selectAgentHistoryModel = createSelector<[typeof selectAgentHistoryStore], Loadable<AgentHistoryEvent[]>>(
  selectAgentHistoryStore,
  (store) => store[SliceNames.History],
);

export const selectAgentHistoryEventsList = createSelector<[typeof selectAgentHistoryModel], AgentHistoryEvent[]>(
  selectAgentHistoryModel,
  selectModelValue((history) => history),
);

export const selectAgentHistoryLoadedCount = createSelector<[typeof selectAgentHistoryEventsList], number>(
  selectAgentHistoryEventsList,
  (list) => list?.length,
);
