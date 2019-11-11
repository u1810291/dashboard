import { createReducer } from 'state/utils';
import { types } from './plans.actions';

const initialState = {
  merchant: {
    billing: null,
  },
  rows: [],
};

export default createReducer(initialState, {
  [types.PLANS_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },
  [types.PLANS_DELETE_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },
});
