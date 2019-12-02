import * as api from 'lib/client/auth';
import { pushEvent } from 'lib/gtm';
import { hubspotEvents, requestApi, submitSignUpForm, trackEvent as hubspotTrackEvent } from 'lib/hubspot';
import * as Mixpanel from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('AUTH_SIGNIN'),
  ...createTypesSequence('AUTH_SIGNOUT'),
  ...createTypesSequence('AUTH_SIGNUP'),
  ...createTypesSequence('AUTH_RECOVERY'),
  ...createTypesSequence('PASSWORD_RESET'),
  ...createTypesSequence('PASSWORD_CHANGE'),
};

export const signIn = (credentials) => async (dispatch) => {
  dispatch({ type: types.AUTH_SIGNIN_REQUEST });
  try {
    const payload = await api.signin(credentials);
    const { email } = credentials;
    dispatch({ type: types.AUTH_SIGNIN_SUCCESS, payload });
    Mixpanel.addUser({ ...payload.data.merchant, email });
    requestApi(payload.data.token, {
      email,
      // TODO @dkchv: bug?
      contactData: {},
    });
    hubspotTrackEvent(hubspotEvents.signIn);
    return payload;
  } catch (error) {
    dispatch({ type: types.AUTH_SIGNIN_FAILURE });
    throw error;
  }
};

export const signUp = (userData) => async (dispatch) => {
  const { email, password, firstName, lastName } = userData;
  dispatch({ type: types.AUTH_SIGNUP_REQUEST });

  try {
    const payload = await api.signup({ email, password, firstName, lastName });
    dispatch({ type: types.AUTH_SIGNUP_SUCCESS, payload });
    Mixpanel.addUser({ ...payload.data.merchant, email });
    Mixpanel.trackEvent(MixPanelEvents.AuthSingUp);
    submitSignUpForm(email);
    pushEvent({ event: 'Sign Up Success' });
    hubspotTrackEvent(hubspotEvents.signUp);
    return payload;
  } catch (error) {
    dispatch({ type: types.AUTH_SIGNUP_FAILURE });
    throw error;
  }
};

export const signOut = () => (dispatch) => {
  dispatch({ type: types.AUTH_SIGNOUT_REQUEST });
  window.localStorage.clear();
};

export const passwordRecovery = (credentials) => async (dispatch) => {
  dispatch({ type: types.AUTH_RECOVERY_REQUEST });
  try {
    const payload = await api.recovery(credentials);
    dispatch({ type: types.AUTH_RECOVERY_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.AUTH_RECOVERY_FAILURE });
    throw error;
  }
};

export const passwordReset = (credentials) => async (dispatch) => {
  dispatch({ type: types.PASSWORD_RESET_REQUEST });
  try {
    const payload = await api.reset(credentials);
    dispatch({ type: types.PASSWORD_RESET_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.PASSWORD_RESET_FAILURE });
    throw error;
  }
};

export const passwordChange = (credentials) => async (dispatch, getState) => {
  dispatch({ type: types.PASSWORD_CHANGE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.changePassword(credentials, token);
    dispatch({ type: types.PASSWORD_CHANGE_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.PASSWORD_CHANGE_FAILURE });
    throw error;
  }
};
