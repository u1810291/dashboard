import { userLoadSuccess } from 'apps/user/state/user.actions';
import { http } from 'lib/client/http';
import { pushEvent } from 'lib/gtm';
import { hubspotEvents, submitSignUpForm, trackEvent as hubspotTrackEvent } from 'lib/hubspot';
import * as Mixpanel from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { hubspotTrack } from 'state/hubspot/hubspot.actions';
import { merchantLoadSuccess } from 'state/merchant/merchant.actions';
import { createTypesSequence } from 'state/utils';
import * as api from '../api/auth.client';
import { AuthActionGroups } from './auth.store';

export const types = {
  ...createTypesSequence(AuthActionGroups.SignIn),
  ...createTypesSequence(AuthActionGroups.SignUp),
  ...createTypesSequence(AuthActionGroups.SignOut),
  ...createTypesSequence(AuthActionGroups.Recovery),
  ...createTypesSequence(AuthActionGroups.PasswordReset),
  ...createTypesSequence(AuthActionGroups.PasswordChange),
};

export const signIn = (credentials) => async (dispatch) => {
  dispatch({ type: types.AUTH_SIGNIN_REQUEST });
  try {
    const { data } = await api.signin(credentials);
    const { token, merchant, user } = data;

    http.setToken(token);
    dispatch(merchantLoadSuccess(merchant));
    dispatch(userLoadSuccess(user));
    dispatch({ type: types.AUTH_SIGNIN_SUCCESS, payload: token });
    Mixpanel.addUser({
      ...merchant,
      email: credentials.email,
    });
    dispatch(hubspotTrack({}));
    hubspotTrackEvent(hubspotEvents.signIn);
  } catch (error) {
    dispatch({ type: types.AUTH_SIGNIN_FAILURE });
    throw error;
  }
};

export const signUpTrack = (merchant, email) => () => {
  Mixpanel.addUser({ ...merchant, email });
  Mixpanel.trackEvent(MixPanelEvents.AuthSingUp);
  submitSignUpForm(email);
  pushEvent({ event: 'Sign Up Success' });
  hubspotTrackEvent(hubspotEvents.signUp);
  if (window.Appcues) {
    window.Appcues.identify(email);
  }
};

export const signUp = (userData) => async (dispatch) => {
  const { email, password, firstName, lastName } = userData;
  dispatch({ type: types.AUTH_SIGNUP_REQUEST });

  try {
    const response = await api.signup({ email, password, firstName, lastName });
    const { token, user, merchant } = response.data;
    http.setToken(token);
    dispatch(merchantLoadSuccess(merchant, false));
    dispatch(userLoadSuccess(user));
    dispatch({ type: types.AUTH_SIGNUP_SUCCESS, payload: token });
    dispatch(signUpTrack(merchant, email));
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

export const passwordChange = (credentials) => async (dispatch) => {
  dispatch({ type: types.PASSWORD_CHANGE_REQUEST });
  try {
    const payload = await api.changePassword(credentials);
    dispatch({ type: types.PASSWORD_CHANGE_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.PASSWORD_CHANGE_FAILURE });
    throw error;
  }
};
