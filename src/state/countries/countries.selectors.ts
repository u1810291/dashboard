import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { COUNTRIES_STORE_KEY } from './countries.store';

export const selectCountriesStore = (state) => state[COUNTRIES_STORE_KEY];
export const selectAllCountriesModel = createSelector(
  selectCountriesStore,
  (store) => store.allCountries,
);

export const selectCountriesList = createSelector(
  selectAllCountriesModel,
  selectModelValue((list) => list),
);

export const selectCountriesOnlyExisting = createSelector(
  selectCountriesStore,
  (store) => store.countriesOnlyExisting,
);

export const selectCountryGeojsons = createSelector(
  selectCountriesStore,
  (store) => store.countryGeojsons,
);
