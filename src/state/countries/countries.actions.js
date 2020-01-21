import * as api from 'lib/client/countries';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('COUNTRIES_GET'),
};

export const getCountries = () => async (dispatch) => {
  dispatch({ type: types.COUNTRIES_GET_REQUEST });
  try {
    const payload = await api.getCountries();
    dispatch({ type: types.COUNTRIES_GET_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.COUNTRIES_GET_FAILURE });
    throw error;
  }
};
