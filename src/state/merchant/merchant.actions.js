import * as api from 'lib/client/merchant';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { MerchantActionGroups } from 'state/merchant/merchant.model';
import { selectConfigurationModel, selectDashboardModel, selectStyleModel } from 'state/merchant/merchant.selectors';
import { initPlans } from 'state/plans/plans.actions';
import { createTypesSequence } from 'state/utils';
import { getWebhooks } from 'state/webhooks/webhooks.actions';

export const types = {
  ...createTypesSequence(MerchantActionGroups.Merchant),
  ...createTypesSequence(MerchantActionGroups.Configuration),
  ...createTypesSequence(MerchantActionGroups.App),
};

// -- merchant

export const merchantLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT2_REQUEST });
  dispatch({ type: types.CONFIGURATION2_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getMerchant(token);

    const { configurations: { dashboard, ...cfg }, billing, ...merchant } = payload.data;
    dispatch({ type: types.MERCHANT2_SUCCESS, payload: merchant });
    dispatch({ type: types.CONFIGURATION2_SUCCESS, payload: cfg });
    dispatch(initPlans(billing || {}));
    return payload;
  } catch (error) {
    dispatch({ type: types.MERCHANT2_FAILURE, error });
    dispatch({ type: types.CONFIGURATION2_FAILURE, error });
    throw error;
  }
};

export const merchantUpdate = (data) => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT2_UPDATING });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.putMerchants(token, data);
    const { configurations, billing, ...merchant } = payload.data;
    dispatch({ type: types.MERCHANT2_SUCCESS, payload: merchant });
  } catch (error) {
    dispatch({ type: types.MERCHANT2_FAILURE, error });
    throw error;
  }
};

export const merchantUpdateMedia = (form) => async (dispatch, getState) => {
  dispatch({ type: types.MERCHANT2_UPDATING });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.uploadMerchantMedia(token, form);
    const payload = {
      logoUrl: data.publicUrl,
    };
    dispatch({ type: types.MERCHANT2_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.MERCHANT2_FAILURE, error });
    throw error;
  }
};

// -- app

export const appLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.APP2_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getMerchantApps(token);
    dispatch({ type: types.APP2_SUCCESS, payload: data.apps });
    dispatch(getWebhooks());
  } catch (error) {
    dispatch({ type: types.APP2_FAILURE, error });
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

  dispatch({ type: types.CONFIGURATION2_UPDATING, payload: newConfiguration });

  try {
    const token = selectAuthToken(getState());
    const { data } = await api.saveConfiguration(token, newConfiguration);
    dispatch({ type: types.CONFIGURATION2_SUCCESS, payload: data.configurations });
    // TODO @dkchv: review again!!!
    // dispatch(getIntegrationCode(token));
  } catch (error) {
    dispatch({ type: types.CONFIGURATION2_FAILURE, error });
    throw error;
  }
};

export const dashboardUpdate = (data) => async (dispatch, getState) => {
  const dashboard = selectDashboardModel(getState());
  dispatch(configurationUpdate({
    dashboard: {
      ...dashboard.value,
      ...data,
    },
  }));
};

export const styleUpdate = (data) => async (dispatch, getState) => {
  const cfg = selectStyleModel(getState());
  dispatch(configurationUpdate({
    style: {
      ...cfg.value,
      ...data,
    },
  }));
};
