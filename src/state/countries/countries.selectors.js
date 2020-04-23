import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { COUNTRIES_STORE_KEY } from './countries.model';

export const selectCountriesModel = (state) => state[COUNTRIES_STORE_KEY];

export const selectCountriesList = createSelector(
  selectCountriesModel,
  selectModelValue((list) => list),
);
