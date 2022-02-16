import { createSelector } from 'reselect';
import { filterSerialize } from 'models/Filter.model';
import { VerificationListItem } from 'models/VerificationOld.model';
import { Loadable } from 'models/Loadable.model';
import { IDENTITIES_STORE_KEY, SliceNames } from './identities.store';
import { IdentitiesState } from './identities.reducer';

export const selectIdentityStore = (state): IdentitiesState => state[IDENTITIES_STORE_KEY];

export const selectIdentityCollection = createSelector<any, any, Loadable<VerificationListItem[]>>(
  selectIdentityStore,
  (store) => store[SliceNames.IdentityList],
);

export const selectFilteredCountModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.FilteredCount],
);

export const selectPreliminaryFilteredCountModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.PreliminaryFilteredCount],
);

export const selectIdentityFilter = createSelector(
  selectIdentityStore,
  (store) => store.filter,
);

export const selectIdentityFilterSerialized = createSelector(
  selectIdentityStore,
  (store) => filterSerialize(store.filter),
);

// identity
export const selectIdentityModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.Identity],
);

export const selectIdentityIsPDFGenerating = createSelector(
  selectIdentityStore,
  (store) => store.isPDFGenerating,
);
