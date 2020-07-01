import { filterSerialize } from 'apps/identity/models/filter.model';
import { createSelector } from 'reselect';
import { IDENTITIES_STORE_KEY, SliceNames } from './identities.model';
import { getIdentityExtras } from '../../models/Identity.model';
import { selectLoadableValue } from '../../lib/loadable.selectors';

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

export const selectReviewCounterModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.ReviewCount],
);

// identity

export const selectIdentityModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.Identity],
);

export const selectIdentityModelWithExtras = createSelector(
  selectIdentityModel,
  selectLoadableValue((value) => ({
    ...value,
    extras: value && getIdentityExtras(value),
  })),
);
