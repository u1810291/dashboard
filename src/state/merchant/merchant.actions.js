import { billingInit } from 'apps/billing/state/billing.actions';
import * as api from 'lib/client/merchant';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { MerchantActionGroups } from 'state/merchant/merchant.model';
import { selectConfigurationModel, selectDashboardModel, selectStyleModel } from 'state/merchant/merchant.selectors';
import { createTypesSequence } from 'state/utils';
import { getWebhooks } from 'state/webhooks/webhooks.actions';

export const types = {
  ...createTypesSequence(MerchantActionGroups.Merchant),
  ...createTypesSequence(MerchantActionGroups.Configuration),
  ...createTypesSequence(MerchantActionGroups.App),
};

// -- merchant

export const merchantLoadSuccess = (data, withDashboard = true) => (dispatch) => {
  const { configurations, billing, ...merchant } = data;
  if (!withDashboard) {
    delete configurations.dashboard;
  }
  dispatch({ type: types.MERCHANT_SUCCESS, payload: merchant });
  dispatch({ type: types.CONFIGURATION_SUCCESS, payload: configurations });
  dispatch(billingInit(billing));
};

export const merchantLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT_REQUEST });
  dispatch({ type: types.CONFIGURATION_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getMerchant(token);
    dispatch(merchantLoadSuccess(data));
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    dispatch({ type: types.CONFIGURATION_FAILURE, error });
    throw error;
  }
};

export const merchantUpdate = (data) => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT_UPDATING });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.putMerchants(token, data);
    const { configurations, billing, ...merchant } = payload.data;
    dispatch({ type: types.MERCHANT_SUCCESS, payload: merchant });
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    throw error;
  }
};

export const merchantUpdateMedia = (form) => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT_UPDATING });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.uploadMerchantMedia(token, form);
    dispatch(merchantUpdate({
      logoUrl: data.publicUrl,
    }));
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    throw error;
  }
};

// -- app

export const appLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.APP_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getMerchantApps(token);
    dispatch({ type: types.APP_SUCCESS, payload: data.apps });
    dispatch(getWebhooks());
  } catch (error) {
    dispatch({ type: types.APP_FAILURE, error });
    throw error;
  }
};

// -- configuration

export const configurationUpdate = (cfg) => async (dispatch, getState) => {
  const state = getState();
  const cfgModel = selectConfigurationModel(state);

  if (!cfgModel.isLoaded) {
    return;
  }

  const newConfiguration = {
    ...cfgModel.value,
    ...cfg,
  };

  dispatch({ type: types.CONFIGURATION_UPDATING, payload: newConfiguration });

  try {
    const token = selectAuthToken(getState());
    const { data } = await api.saveConfiguration(token, newConfiguration);
    dispatch({ type: types.CONFIGURATION_SUCCESS, payload: data.configurations });
  } catch (error) {
    dispatch({ type: types.CONFIGURATION_FAILURE, error });
    throw error;
  }
};

export const dashboardUpdate = (data) => (dispatch, getState) => {
  const dashboard = selectDashboardModel(getState());
  return dispatch(configurationUpdate({
    dashboard: {
      ...dashboard.value,
      ...data,
    },
  }));
};

export const styleUpdate = (data) => (dispatch, getState) => {
  const cfg = selectStyleModel(getState());
  return dispatch(configurationUpdate({
    style: {
      ...cfg.value,
      ...data,
    },
  }));
};
