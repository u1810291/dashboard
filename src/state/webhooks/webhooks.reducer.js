import { createReducer } from 'state/utils';
import { types } from './webhooks.actions';

const initialState = {
  webhooks: {},
};

export default createReducer(initialState, {
  [types.WEBHOOKS_LIST_SUCCESS](state, { payload, clientId }) {
    return {
      ...state,
      webhooks: {
        ...state.webhooks,
        [clientId]: payload.data || [],
      },
    };
  },
});
