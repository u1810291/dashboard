import * as api from 'lib/client/countries';
import { createTypesSequence } from 'state/utils';
import { CountriesActionGroups } from './countries.model';

export const types = {
  ...createTypesSequence(CountriesActionGroups.Countries),
};

export const getCountries = () => async (dispatch) => {
  dispatch({ type: types.COUNTRIES_REQUEST });
  try {
    const { data } = await api.getCountries();
    dispatch({ type: types.COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.COUNTRIES_FAILURE });
    throw error;
  }
};
