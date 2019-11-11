import client from 'lib/client';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('COUNTRIES_GET'),
};

export function getCountries(token) {
  return function handle(dispatch) {
    dispatch({ type: types.COUNTRIES_GET_REQUEST });
    return client.countries.getCountries(token)
      .then((payload) => {
        dispatch({ type: types.COUNTRIES_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.COUNTRIES_GET_FAILURE });
        throw error;
      });
  };
}
