import { last } from 'lodash';
import { createReducer } from 'state/utils';
import { types } from './webhooks.actions';

const initialState = {
  webhook: {},
};

export default createReducer(initialState, {
  [types.WEBHOOKS_LIST_SUCCESS](state, { payload }) {
    return {
      ...state,
      webhook: last(payload) || {},
    };
  },
});
