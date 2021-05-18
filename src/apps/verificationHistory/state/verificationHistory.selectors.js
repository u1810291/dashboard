import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { filterSerialize } from 'models/Filter.model';
import { SliceNames, VERIFICATION_HISTORY_STORE_KEY } from './verificationHistory.store';

export const selectVerificationHistoryStore = (state) => state[VERIFICATION_HISTORY_STORE_KEY];

export const selectVerificationHistoryFilter = createSelector(
  selectVerificationHistoryStore,
  (store) => store[SliceNames.Filter],
);

export const selectVerificationHistoryFilterSerialized = createSelector(
  selectVerificationHistoryStore,
  (store) => filterSerialize(store.filter),
);

export const selectVerificationChangesTotalCount = createSelector(
  selectVerificationHistoryStore,
  (store) => store[SliceNames.Count],
);

export const selectVerificationChangesModel = createSelector(
  selectVerificationHistoryStore,
  (store) => store[SliceNames.Changes],
);

export const selectVerificationChangesList = createSelector(
  selectVerificationChangesModel,
  selectModelValue((changes) => changes),
);
