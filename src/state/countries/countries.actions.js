import * as api from 'lib/client/countries';
import { createTypesSequence } from 'state/utils';
import { CountriesActionGroups } from './countries.store';

export const types = {
  ...createTypesSequence(CountriesActionGroups.AllCountries),
  ...createTypesSequence(CountriesActionGroups.CountriesOnlyExisting),
  ...createTypesSequence(CountriesActionGroups.CountryGeojsons),
};

export const loadCountries = () => async (dispatch) => {
  dispatch({ type: types.ALL_COUNTRIES_REQUEST });
  try {
    const { data } = await api.getCountries();
    dispatch({ type: types.ALL_COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.ALL_COUNTRIES_FAILURE });
    throw error;
  }
};

export const loadCountriesOnlyExisting = () => async (dispatch) => {
  dispatch({ type: types.COUNTRIES_ONLY_EXISTING_REQUEST });
  try {
    const { data } = await api.getOnlyExistingCountries();
    dispatch({ type: types.COUNTRIES_ONLY_EXISTING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.COUNTRIES_ONLY_EXISTING_FAILURE, error });
    throw error;
  }
};

export const loadCountryGeojsons = () => async (dispatch) => {
  dispatch({ type: types.COUNTRY_GEOJSONS_REQUEST });
  try {
    const { data } = await api.getCountryGeojsons();
    dispatch({ type: types.COUNTRY_GEOJSONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.COUNTRY_GEOJSONS_FAILURE });
    throw error;
  }
};
