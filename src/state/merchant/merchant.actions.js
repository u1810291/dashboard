import * as api from 'lib/client/merchant';
import { createTypesSequence } from 'state/utils';
import { getWebhooks } from 'state/webhooks/webhooks.actions';
import { selectConfigurationModel, selectCurrentFlowId, selectMerchantFlowsModel, selectMerchantId, selectStyleModel } from './merchant.selectors';
import { MerchantActionGroups } from './merchant.store';

export const types = {
  ...createTypesSequence(MerchantActionGroups.Merchant),
  ...createTypesSequence(MerchantActionGroups.Configuration),
  ...createTypesSequence(MerchantActionGroups.App),
  ...createTypesSequence(MerchantActionGroups.Flows),
  CURRENT_FLOW_UPDATE: 'CURRENT_FLOW_UPDATE',
  BUSINESS_NAME_UPDATE: 'BUSINESS_NAME_UPDATE',
};

// -- merchant

export const merchantLoadSuccess = (data, withDashboard = true) => (dispatch) => {
  const { configurations, ...merchant } = data;
  if (!withDashboard) {
    delete configurations.dashboard;
  }
  dispatch({ type: types.MERCHANT_SUCCESS, payload: merchant });
  dispatch({ type: types.CONFIGURATION_SUCCESS, payload: configurations });
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

export const configurationUpdate = (cfg, isSync) => async (dispatch, getState) => {
  const cfgModel = selectConfigurationModel(getState());
  const newConfiguration = {
    ...cfgModel.value,
    ...cfg,
  };

  if (!isSync) {
    dispatch({ type: types.CONFIGURATION_UPDATING, payload: newConfiguration });
    return;
  }

  if (!cfgModel.isLoaded) {
    throw Error('configuration didn\'t loaded');
  }

  dispatch({ type: types.CONFIGURATION_UPDATING, payload: newConfiguration });

  try {
    const { data } = await api.saveConfiguration(cfg);
    dispatch({ type: types.CONFIGURATION_SUCCESS, payload: data.configurations });
  } catch (error) {
    dispatch({ type: types.CONFIGURATION_FAILURE, error });
    throw error;
  }
};

export const dashboardUpdate = (data, isSync) => (dispatch) => {
  dispatch(configurationUpdate({ dashboard: { ...data } }, isSync));
};

export const changeLanguage = (language, isSync) => (dispatch) => {
  dispatch(dashboardUpdate({ language }, isSync));
};
// flows

export const updateCurrentFlowId = (data) => (dispatch) => {
  dispatch({ type: types.CURRENT_FLOW_UPDATE, payload: data });
  dispatch(getWebhooks());
};

export const merchantFlowsLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.FLOWS_REQUEST });
  const merchantId = selectMerchantId(getState());
  try {
    const { data } = await api.getMerchantFlows(merchantId);
    if (Array.isArray(data) && data.length > 0 && data[0].id) {
      dispatch(updateCurrentFlowId(data[0].id));
      dispatch({ type: types.FLOWS_SUCCESS, payload: data });
    } else {
      const error = new Error('Wrong data received from server');
      dispatch({ type: types.FLOWS_FAILURE, error });
      throw error;
    }
    // dispatch(getWebhooks());
  } catch (error) {
    dispatch({ type: types.FLOWS_FAILURE, error });
    throw error;
  }
};

export const merchantUpdateFlow = (flowId, payload) => async (dispatch, getState) => {
  dispatch({ type: types.FLOWS_UPDATING });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.updateMerchantFlow(merchantId, flowId, payload);
    const { value } = selectMerchantFlowsModel(getState());
    const index = value.findIndex((flow) => flow.id === flowId);
    const newFlow = [...value];
    newFlow.splice(index, 1, data);
    dispatch({ type: types.FLOWS_SUCCESS, payload: newFlow, isReset: true });
  } catch (error) {
    dispatch({ type: types.FLOWS_FAILURE, error });
    throw error;
  }
};

export const merchantCreateFlow = (payload) => async (dispatch, getState) => {
  dispatch({ type: types.FLOWS_REQUEST });
  try {
    const merchantId = selectMerchantId(getState());
    const { value } = selectMerchantFlowsModel(getState());
    const { data } = await api.createMerchantFlow(merchantId, payload);
    dispatch({ type: types.FLOWS_SUCCESS, payload: [...value, data], isReset: true });
    return data;
  } catch (error) {
    dispatch({ type: types.FLOWS_FAILURE, error });
    throw error;
  }
};

export const merchantDeleteFlow = (id) => async (dispatch, getState) => {
  dispatch({ type: types.FLOWS_REQUEST });
  try {
    const merchantId = selectMerchantId(getState());
    const { value } = selectMerchantFlowsModel(getState());
    const index = value.findIndex((flow) => flow.id === id);
    await api.deleteMerchantFlow(merchantId, id);
    const payload = value.filter((_, i) => i !== index);
    dispatch({ type: types.FLOWS_SUCCESS, payload, isReset: true });
  } catch (error) {
    dispatch({ type: types.FLOWS_FAILURE, error });
    throw error;
  }
};

// flow update

export const configurationFlowUpdate = (payload) => async (dispatch, getState) => {
  const flowId = selectCurrentFlowId(getState());
  return dispatch(merchantUpdateFlow(flowId, payload));
};

export const flowStyleUpdate = (data) => (dispatch, getState) => {
  const cfg = selectStyleModel(getState());
  const flowId = selectCurrentFlowId(getState());
  return dispatch(merchantUpdateFlow(flowId, {
    style: {
      ...cfg,
      ...data,
    },
  }));
};

export const merchantUpdateMedia = (form) => async (dispatch) => {
  dispatch({ type: types.MERCHANT_UPDATING });
  try {
    const { data } = await api.uploadMerchantMedia(form);
    dispatch(configurationFlowUpdate({ logoUrl: data.url }));
  } catch (error) {
    dispatch({ type: types.MERCHANT_FAILURE, error });
    throw error;
  }
};

export const merchantUpdateBusinessName = (businessName) => async (dispatch) => {
  const { data } = await api.saveBusinessName(businessName);
  dispatch({ type: types.BUSINESS_NAME_UPDATE, payload: { businessName: data.businessName } });
};
