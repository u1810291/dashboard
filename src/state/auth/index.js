import { createReducer, createTypesSequence } from 'state/utils';
import client from 'lib/client';
import { updateIntercom } from 'lib/intercom';
import * as Mixpanel from 'lib/mixpanel';
import { pushEvent } from 'lib/gtm';
import {
  createContact,
  trackEvent as hubspotTrackEvent,
  hubspotEvents,
} from 'lib/hubspot';

export const types = {
  ...createTypesSequence('AUTH_SIGNIN'),
  ...createTypesSequence('AUTH_SIGNOUT'),
  ...createTypesSequence('AUTH_SIGNUP'),
  ...createTypesSequence('AUTH_RECOVERY'),
  ...createTypesSequence('PASSWORD_RESET'),
  ...createTypesSequence('PASSWORD_CHANGE'),
};

export function signIn(credentials) {
  return function handle(dispatch) {
    dispatch({ type: types.AUTH_SIGNIN_REQUEST });
    return client.auth
      .signin(credentials)
      .then((payload) => {
        dispatch({ type: types.AUTH_SIGNIN_SUCCESS, payload });
        Mixpanel.addUser({ ...payload.data.merchant, email: credentials.email });
        createContact({ email: credentials.email });
        hubspotTrackEvent(hubspotEvents.signIn);
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_SIGNIN_FAILURE });
        throw error;
      });
  };
}

export function signUp(userData) {
  const { email, password, firstName, lastName } = userData;
  return (dispatch) => {
    dispatch({ type: types.AUTH_SIGNUP_REQUEST });
    return client.auth
      .signup({ email, password, firstName, lastName })
      .then((payload) => {
        dispatch({ type: types.AUTH_SIGNUP_SUCCESS, payload });
        updateIntercom(payload.data.user);
        Mixpanel.addUser({ ...payload.data.merchant, email });
        Mixpanel.trackEvent('dash_signup');
        createContact(userData);
        pushEvent({ event: 'Sign Up Success' });
        hubspotTrackEvent(hubspotEvents.signUp);
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_SIGNUP_FAILURE });
        throw error;
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_SIGNUP_FAILURE });
        throw error;
      });
  };
}

export function signOut() {
  return function handle(dispatch) {
    dispatch({ type: types.AUTH_SIGNOUT_REQUEST });
    window.localStorage.clear();
  };
}

export function passwordRecovery(credentials) {
  return function handle(dispatch) {
    dispatch({ type: types.AUTH_RECOVERY_REQUEST });
    return client.auth
      .recovery(credentials)
      .then((payload) => {
        dispatch({ type: types.AUTH_RECOVERY_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_RECOVERY_FAILURE });
        throw error;
      });
  };
}

export function passwordReset(credentials) {
  return function handle(dispatch) {
    dispatch({ type: types.PASSWORD_RESET_REQUEST });
    return client.auth
      .reset(credentials)
      .then((payload) => {
        dispatch({ type: types.PASSWORD_RESET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.PASSWORD_RESET_FAILURE });
        throw error;
      });
  };
}
export function passwordChange(credentials, token) {
  return function handle(dispatch) {
    dispatch({ type: types.PASSWORD_CHANGE_REQUEST });
    return client.auth
      .changePassword(credentials, token)
      .then((payload) => {
        dispatch({ type: types.PASSWORD_CHANGE_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.PASSWORD_CHANGE_FAILURE });
        throw error;
      });
  };
}

const initialState = {};

const reducer = createReducer(initialState, {
  [types.AUTH_SIGNIN_SUCCESS](
    state,
    {
      payload: {
        data: { token, user },
      },
    },
  ) {
    return {
      ...state,
      token,
      user,
    };
  },

  [types.AUTH_SIGNUP_SUCCESS](
    state,
    {
      payload: {
        data: { token, user },
      },
    },
  ) {
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

export default reducer;
