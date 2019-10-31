import client from 'lib/client';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('MERCHANT_GET'),
  ...createTypesSequence('MERCHANT_STATISTIC_GET'),
  ...createTypesSequence('MERCHANT_STATISTIC_FILTER_GET'),
  ...createTypesSequence('MERCHANTS_PUT'),
  ...createTypesSequence('CONFIGURATION_SAVE'),
  ...createTypesSequence('INTEGRATION_CODE'),
  ...createTypesSequence('GET_MERCHANT_APPS'),
  ...createTypesSequence('SET_MERCHANT_PLAN'),
  ...createTypesSequence('ADD_MERCHANT_PROVIDER'),
  ...createTypesSequence('UPDATE_MERCHANT_PLAN'),
  ...createTypesSequence('SET_MERCHANT_LANG'),
  ...createTypesSequence('UPLOAD_MERCHANT_MEDIA'),
};

export function getMerchant(token) {
  return function handle(dispatch) {
    dispatch({ type: types.MERCHANT_GET_REQUEST });
    return client.merchant
      .getMerchant(token)
      .then((payload) => {
        dispatch({ type: types.MERCHANT_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANT_GET_FAILURE });
        throw error;
      });
  };
}

export function getMerchantStatistic(token) {
  return function handle(dispatch) {
    dispatch({ type: types.MERCHANT_STATISTIC_GET_REQUEST });
    return client.merchant
      .getMerchantStatistic(token)
      .then((payload) => {
        dispatch({ type: types.MERCHANT_STATISTIC_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANT_STATISTIC_GET_FAILURE });
        throw error;
      });
  };
}

export function getMerchantStatisticFilter(token, filter) {
  return function handle(dispatch) {
    dispatch({ type: types.MERCHANT_STATISTIC_FILTER_GET_REQUEST });
    return client.merchant
      .getMerchantStatisticFilter(token, filter)
      .then((payload) => {
        dispatch({ type: types.MERCHANT_STATISTIC_FILTER_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANT_STATISTIC_FILTER_GET_FAILURE });
        throw error;
      });
  };
}

export function putMerchants(token, credentials) {
  return function handle(dispatch) {
    dispatch({ type: types.MERCHANTS_PUT_REQUEST });
    return client.merchant
      .putMerchants(token, credentials)
      .then((payload) => {
        dispatch({ type: types.MERCHANTS_PUT_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANTS_PUT_FAILURE });
        throw error;
      });
  };
}

export function getMerchantApps(token) {
  return function handle(dispatch) {
    dispatch({ type: types.GET_MERCHANT_APPS_REQUEST });
    return client.merchant
      .getMerchantApps(token)
      .then((payload) => {
        dispatch({ type: types.GET_MERCHANT_APPS_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.GET_MERCHANT_APPS_FAILURE });
        throw error;
      });
  };
}

export function getIntegrationCode(token) {
  return function handle(dispatch) {
    dispatch({ type: types.INTEGRATION_CODE_REQUEST });
    return client.merchant
      .getIntegrationCode(token)
      .then((payload) => {
        dispatch({ type: types.INTEGRATION_CODE_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.INTEGRATION_CODE_FAILURE });
        throw error;
      });
  };
}

export function saveConfiguration(token, configurations) {
  return function handle(dispatch, getState) {
    const newConfiguration = {
      ...getState().merchant.configurations,
      ...configurations,
    };

    dispatch({
      type: types.CONFIGURATION_SAVE_REQUEST,
      configurations: newConfiguration,
    });

    return client.merchant
      .saveConfiguration(token, newConfiguration)
      .then((payload) => {
        dispatch({ type: types.CONFIGURATION_SAVE_SUCCESS, payload });
        getIntegrationCode(token);
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.CONFIGURATION_SAVE_FAILURE });
        throw error;
      });
  };
}

export function setMerchantPlan(token, planId) {
  return function handle(dispatch) {
    dispatch({
      type: types.SET_MERCHANT_PLAN_REQUEST,
      planId,
    });

    return client.merchant
      .setMerchantPlan(token, planId)
      .then((payload) => {
        dispatch({ type: types.SET_MERCHANT_PLAN_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.SET_MERCHANT_PLAN_FAILURE });
        throw error;
      });
  };
}

export function addMerchantProvider(token, source) {
  return function handle(dispatch) {
    dispatch({ type: types.ADD_MERCHANT_PROVIDER_REQUEST });

    return client.merchant
      .addMerchantProvider(token, source)
      .then((payload) => {
        dispatch({ type: types.ADD_MERCHANT_PROVIDER_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.ADD_MERCHANT_PROVIDER_FAILURE });
        throw error;
      });
  };
}

export function uploadMerchantMedia(token, form) {
  return function handle(dispatch) {
    dispatch({ type: types.UPLOAD_MERCHANT_MEDIA_REQUEST });

    return client.merchant
      .uploadMerchantMedia(token, form)
      .then((payload) => {
        dispatch({ type: types.UPLOAD_MERCHANT_MEDIA_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.UPLOAD_MERCHANT_MEDIA_FAILURE });
        throw error;
      });
  };
}
