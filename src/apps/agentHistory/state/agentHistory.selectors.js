import { filterSerialize } from 'models/Filter.model';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { AGENT_HISTORY_STORE_KEY, SliceNames } from './agentHistory.store';

export const selectAgentHistoryStore = (state) => state[AGENT_HISTORY_STORE_KEY];

export const selectAgentHistoryFilter = createSelector(
  selectAgentHistoryStore,
  (store) => store.filter,
);

export const selectAgentHistoryFilterSerialized = createSelector(
  selectAgentHistoryStore,
  (store) => filterSerialize(store.filter),
);

export const selectAgentHistoryTotalCount = createSelector(
  selectAgentHistoryStore,
  (store) => store[SliceNames.Count],
);

export const selectAgentHistoryModel = createSelector(
  selectAgentHistoryStore,
  (store) => store[SliceNames.History],
);

export const selectAgentHistoryEventsList = createSelector(
  selectAgentHistoryModel,
  selectModelValue((history) => history),
);

export const selectAgentHistoryLoadedCount = createSelector(
  selectAgentHistoryEventsList,
  (list) => list?.length,
);
