import { filterSerialize } from 'models/Filter.model';
import { createSelector } from 'reselect';
import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { getIdentityExtras } from 'models/Identity.model';
import { IDENTITIES_STORE_KEY, SliceNames } from './identities.store';
import { selectCountriesList } from '../countries/countries.selectors';

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

export const selectPreliminaryFilteredCountModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.PreliminaryFilteredCount],
);

export const selectManualReviewCountModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.ManualReviewCount],
);

export const selectIdentityFilter = createSelector(
  selectIdentityStore,
  (store) => store.filter,
);

export const selectIdentityFilterSerialized = createSelector(
  selectIdentityStore,
  (store) => filterSerialize(store.filter),
);

export const selectIdentityProfileModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.IdentityProfile],
);

export const selectIdentityProfile = createSelector(
  selectIdentityProfileModel,
  selectModelValue(),
);

export const selectIdentityProfileId = createSelector(
  selectIdentityProfile,
  (profile) => profile?._id,
);

// identity
export const selectIdentityModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.Identity],
);

export const selectIdentityModelWithExtras = createSelector(
  selectIdentityModel,
  selectCountriesList,
  selectLoadableValue((value, countries) => getIdentityExtras(value, countries)),
);

export const selectIdentityIsPDFGenerating = createSelector(
  selectIdentityStore,
  (store) => store.isPDFGenerating,
);