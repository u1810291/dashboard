import { billingInit } from 'apps/billing/state/billing.actions';
import * as api from 'lib/client/merchant';
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

export const merchantLoad = () => async (dispatch) => {
  dispatch({ type: types.MERCHANT_REQUEST });
  dispatch({ type: types.CONFIGURATION_REQUEST });
  try {
    const { data } = await api.getMerchant();
    dispatch(merchantLoadSuccess(data));
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    dispatch({ type: types.CONFIGURATION_FAILURE, error });
    throw error;
  }
};

export const merchantUpdate = (data) => async (dispatch) => {
  dispatch({ type: types.MERCHANT_UPDATING });
  try {
    const payload = await api.putMerchants(data);
    const { configurations, billing, ...merchant } = payload.data;
    dispatch({ type: types.MERCHANT_SUCCESS, payload: merchant });
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    throw error;
  }
};

export const merchantUpdateMedia = (form) => async (dispatch) => {
  dispatch({ type: types.MERCHANT_UPDATING });
  try {
    const { data } = await api.uploadMerchantMedia(form);
    dispatch(merchantUpdate({
      logoUrl: data.url,
    }));
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    throw error;
  }
};

// -- app

export const appLoad = () => async (dispatch) => {
  dispatch({ type: types.APP_REQUEST });
  try {
    const { data } = await api.getMerchantApps();
    dispatch({ type: types.APP_SUCCESS, payload: data.apps });
    dispatch(getWebhooks());
  } catch (error) {
    dispatch({ type: types.APP_FAILURE, error });
    throw error;
  }
};

// -- configuration

export const configurationUpdate = (cfg) => async (dispatch, getState) => {
  const cfgModel = selectConfigurationModel(getState());

  if (!cfgModel.isLoaded) {
    throw Error('configuration didn\'t loaded');
  }

  const newConfiguration = {
    ...cfgModel.value,
    ...cfg,
  };

  dispatch({ type: types.CONFIGURATION_UPDATING, payload: newConfiguration });

  try {
    const { data } = await api.saveConfiguration(newConfiguration);
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

export const onboardingUpdate = (data) => async (dispatch, getState) => {
  const state = getState();
  const cfgModel = selectConfigurationModel(state);

  if (!cfgModel.isLoaded) {
    throw Error('configuration didn\'t loaded');
  }

  const newCfg = {
    ...cfgModel.value,
    dashboard: {
      ...cfgModel.value.dashboard,
      info: data,
      shouldPassOnboarding: false,
    },
  };

  await dispatch(merchantUpdate({
    businessName: data.organization,
    configurations: newCfg,
  }));

  dispatch({ type: types.CONFIGURATION_SUCCESS, payload: newCfg });
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
