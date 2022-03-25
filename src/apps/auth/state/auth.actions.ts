import { userLoadSuccess } from 'apps/user/state/user.actions';
import { pushEvent } from 'lib/gtm';
import { dashboardUpdate, merchantLoadSuccess, merchantLoad } from 'state/merchant/merchant.actions';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { selectLanguage, selectMerchantModel } from 'state/merchant/merchant.selectors';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../api/auth.client';
import { AuthActionGroups } from './auth.store';
import { AuthStore } from './auth.reducer';

export const types: TypesSequence = {
  ...createTypesSequence(AuthActionGroups.SignIn),
  ...createTypesSequence(AuthActionGroups.SignUp),
  ...createTypesSequence(AuthActionGroups.SignOut),
  ...createTypesSequence(AuthActionGroups.Recovery),
  ...createTypesSequence(AuthActionGroups.PasswordReset),
};

type AuthThunkAction = ThunkAction<Promise<void> | void, AuthStore, {}, AnyAction>;

export const signIn = (credentials: { email: string; password: string}): AuthThunkAction => async (dispatch, getState): Promise<void> => {
  dispatch({ type: types.AUTH_SIGNIN_REQUEST });
  try {
    const { data } = await api.signin(credentials);
    const { merchant, user } = data;
    const currentLang = selectLanguage(getState());

    dispatch(merchantLoadSuccess(merchant));
    dispatch(userLoadSuccess(user));
    dispatch({ type: types.AUTH_SIGNIN_SUCCESS });

    const updatedLang = selectLanguage(getState());
    if (currentLang !== updatedLang) {
      dispatch(dashboardUpdate({
        language: updatedLang,
      }));
    }
  } catch (error) {
    dispatch({ type: types.AUTH_SIGNIN_FAILURE });
    throw error;
  }
};

export const signUpTrack = (email: string): AuthThunkAction => () => {
  pushEvent({ event: 'Sign Up Success' });
  // @ts-ignore
  if (window.Appcues) {
    // @ts-ignore
    window.Appcues.identify(email);
  }
};

export const signUp = (userData: { email: string; password: string }): AuthThunkAction => async (dispatch) => {
  dispatch({ type: types.AUTH_SIGNUP_REQUEST });

  try {
    const response = await api.signup(userData);
    const { user, merchant } = response.data;
    dispatch(merchantLoadSuccess(merchant, false));
    dispatch(userLoadSuccess(user));
    dispatch({ type: types.AUTH_SIGNUP_SUCCESS });
    dispatch(signUpTrack(userData.email));
  } catch (error) {
    dispatch({ type: types.AUTH_SIGNUP_FAILURE });
    throw error;
  }
};

export const signOut = (): AuthThunkAction => (dispatch) => {
  dispatch({ type: types.AUTH_SIGNOUT_REQUEST });
  window.localStorage.clear();
  if (window.Intercom) {
    window.Intercom('shutdown');
  }
};

export const passwordRecovery = (credentials: { email: string }): AuthThunkAction => async (dispatch) => {
  dispatch({ type: types.AUTH_RECOVERY_REQUEST });
  try {
    const payload = await api.recovery(credentials);
    dispatch({ type: types.AUTH_RECOVERY_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.AUTH_RECOVERY_FAILURE });
    throw error;
  }
};

export const passwordReset = (credentials: { password: string; token: string }): AuthThunkAction => async (dispatch) => {
  dispatch({ type: types.PASSWORD_RESET_REQUEST });
  try {
    const payload = await api.reset(credentials);
    dispatch({ type: types.PASSWORD_RESET_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.PASSWORD_RESET_FAILURE });
    throw error;
  }
};

export const merchantLoadWithCheck = (): AuthThunkAction => async (dispatch, getState) => {
  const merchantModel = selectMerchantModel(getState());
  if (LoadableAdapter.isPristine(merchantModel)) {
    try {
      await dispatch(merchantLoad());
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(signOut());
      }
      throw error;
    }
  }
};
