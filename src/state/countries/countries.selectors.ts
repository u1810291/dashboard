import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { COUNTRIES_STORE_KEY, SliceNameTypes } from './countries.store';

export const selectCountriesStore = (state: {COUNTRIES_STORE_KEY: any}) => state[COUNTRIES_STORE_KEY];
export const selectAllCountriesModel = createSelector(
  selectCountriesStore,
  (store) => store[SliceNameTypes.AllCountries],
);

export const selectCountriesList = createSelector<[typeof selectAllCountriesModel], any>(
  selectAllCountriesModel,
  selectModelValue((list) => list),
);

export const selectCountryGeojsons = createSelector(
  selectCountriesStore,
  (store) => store.countryGeojsons,
);
