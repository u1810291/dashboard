import { filterSerialize } from 'apps/identity/models/filter.model';
import { createSelector } from 'reselect';
import { IDENTITIES_STORE_KEY, SliceNames } from './identities.model';

export const selectIdentityStore = (state) => state[IDENTITIES_STORE_KEY];

export const selectIdentityCollection = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.IdentityList],
);

export const selectIdentityCountModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.IdentityCount],
);

export const selectFilteredCountModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.FilteredCount],
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
