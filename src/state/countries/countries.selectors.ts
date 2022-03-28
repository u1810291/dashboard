import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { COUNTRIES_STORE_KEY, SliceNames } from './countries.store';

export const selectCountriesStore = (state) => state[COUNTRIES_STORE_KEY];
export const selectAllCountriesModel = createSelector(
  selectCountriesStore,
  (store) => store[SliceNames.AllCountries],
);

export const selectCountriesList = createSelector(
  selectAllCountriesModel,
  selectModelValue((list) => list),
);

export const selectCountryGeojsons = createSelector(
  selectCountriesStore,
  (store) => store.countryGeojsons,
);
