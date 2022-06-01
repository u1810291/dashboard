import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { filterSerialize } from 'models/Filter.model';
import { SliceNameTypes, VERIFICATION_HISTORY_STORE_KEY } from './verificationHistory.store';

export const selectVerificationHistoryStore = (state) => state[VERIFICATION_HISTORY_STORE_KEY];

export const selectVerificationHistoryFilter = createSelector(
  selectVerificationHistoryStore,
  (store) => store[SliceNameTypes.Filter],
);

export const selectVerificationHistoryFilterSerialized = createSelector(
  selectVerificationHistoryStore,
  (store) => filterSerialize(store.filter),
);

export const selectVerificationChangesTotalCount = createSelector(
  selectVerificationHistoryStore,
  (store) => store[SliceNameTypes.Count] || 0,
);

export const selectVerificationChangesModel = createSelector(
  selectVerificationHistoryStore,
  (store) => store[SliceNameTypes.Changes],
);

export const selectVerificationChangesList = createSelector(
  selectVerificationChangesModel,
  selectModelValue((changes) => changes || []),
);
