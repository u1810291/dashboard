import { createReducer } from 'state/store.utils';
import { types } from './auth.actions';

export type AuthStore = {};

const initialState: AuthStore = {};

// All of these return the initial state, its on purpose. While these offer no
// functionality, they help with tracking the auth process in Redux devtools.
export default createReducer(initialState, {
  [types.AUTH_SIGNIN_SUCCESS]() {
    return initialState;
  },

  [types.AUTH_SIGNUP_SUCCESS]() {
    return initialState;
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
