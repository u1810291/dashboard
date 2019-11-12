import * as api from 'lib/client/merchant';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { initPlans } from 'state/plans/plans.actions';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('MERCHANT_GET'),
  ...createTypesSequence('MERCHANTS_PUT'),
  ...createTypesSequence('CONFIGURATION_SAVE'),
  ...createTypesSequence('INTEGRATION_CODE'),
  ...createTypesSequence('GET_MERCHANT_APPS'),
  ...createTypesSequence('UPDATE_MERCHANT_PLAN'),
  ...createTypesSequence('SET_MERCHANT_LANG'),
  ...createTypesSequence('UPLOAD_MERCHANT_MEDIA'),
};

export const getMerchant = () => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getMerchant(token);
    dispatch({ type: types.MERCHANT_GET_SUCCESS, payload });
    dispatch(initPlans(payload.data.billing));
    return payload;
  } catch (error) {
    dispatch({ type: types.MERCHANT_GET_FAILURE });
    throw error;
  }
};

export const putMerchants = (data) => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANTS_PUT_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.putMerchants(token, data);
    dispatch({ type: types.MERCHANTS_PUT_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.MERCHANTS_PUT_FAILURE });
    throw error;
  }
};

export const getMerchantApps = () => async (dispatch, getState) => {
  dispatch({ type: types.GET_MERCHANT_APPS_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getMerchantApps(token);
    dispatch({ type: types.GET_MERCHANT_APPS_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.GET_MERCHANT_APPS_FAILURE });
    throw error;
  }
};

export const getIntegrationCode = () => async (dispatch, getState) => {
  dispatch({ type: types.INTEGRATION_CODE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getIntegrationCode(token);
    dispatch({ type: types.INTEGRATION_CODE_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.INTEGRATION_CODE_FAILURE });
    throw error;
  }
};

export const saveConfiguration = (configurations) => async (dispatch, getState) => {
  const newConfiguration = {
    ...getState().merchant.configurations,
    ...configurations,
  };

  dispatch({ type: types.CONFIGURATION_SAVE_REQUEST, configurations: newConfiguration });

  try {
    const token = selectAuthToken(getState());
    const payload = await api.saveConfiguration(token, newConfiguration);
    dispatch({ type: types.CONFIGURATION_SAVE_SUCCESS, payload });
    // TODO @dkchv: review again!!!
    dispatch(getIntegrationCode(token));
    return payload;
  } catch (error) {
    dispatch({ type: types.CONFIGURATION_SAVE_FAILURE });
    throw error;
  }
};

export const uploadMerchantMedia = (form) => async (dispatch, getState) => {
  dispatch({ type: types.UPLOAD_MERCHANT_MEDIA_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.uploadMerchantMedia(token, form);
    dispatch({ type: types.UPLOAD_MERCHANT_MEDIA_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.UPLOAD_MERCHANT_MEDIA_FAILURE });
    throw error;
  }
};
