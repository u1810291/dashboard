import { createReducer } from 'state/utils';
import { types } from './auth.actions';

const initialState = {
  token: null,
};

export default createReducer(initialState, {
  [types.AUTH_SIGNIN_SUCCESS](state, { payload }) {
    return {
      token: payload,
    };
  },

  [types.AUTH_SIGNUP_SUCCESS](state, { payload }) {
    return {
      token: payload,
    };
  },

  [types.AUTH_SIGNOUT_REQUEST]() {
    return initialState;
  },

  [types.PASSWORD_RESET_SUCCESS]() {
    return initialState;
  },

  [types.PASSWORD_CHANGE_SUCCESS]() {
    return initialState;
  },
});
