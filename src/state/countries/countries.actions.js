import * as api from 'lib/client/countries';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('COUNTRIES_GET'),
};

export const getCountries = () => async (dispatch, getState) => {
  dispatch({ type: types.COUNTRIES_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getCountries(token);
    dispatch({ type: types.COUNTRIES_GET_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.COUNTRIES_GET_FAILURE });
    throw error;
  }
};
