import { createReducer } from 'state/utils';
import { types } from './countries.actions';

const initialState = {
  countries: [],
  isLoading: true,
};

export default createReducer(initialState, {
  [types.COUNTRIES_GET_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [types.COUNTRIES_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      countries: payload.data,
      isLoading: false,
    };
  },
});
