import { createReducer } from 'state/utils';
import { types } from './auth.actions';

const initialState = {
  user: {
    // id
    email: null,
  },
  token: null,
};

export default createReducer(initialState, {
  [types.AUTH_SIGNIN_SUCCESS](state, {
    payload: {
      data: { token, user },
    },
  }) {
    return {
      ...state,
      token,
      user,
    };
  },

  [types.AUTH_SIGNUP_SUCCESS](state, { token, user }) {
    return {
      ...state,
      token,
      user,
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
