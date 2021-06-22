import { last } from 'lodash';
import { createReducer } from 'state/store.utils';
import { types } from 'state/webhooks/webhooks.actions';

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
