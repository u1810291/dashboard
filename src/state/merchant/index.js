import { get, last } from 'lodash';
import { createReducer, createTypesSequence } from 'state/utils';
import client from 'lib/client';

export * from './consts';

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
  ...createTypesSequence('CREATE_APPLICATION'),
  ...createTypesSequence('SET_MERCHANT_LANG'),
  ...createTypesSequence('UPLOAD_MERCHANT_MEDIA'),
};

export function getMerchant(token) {
  return function handle(dispatch) {
    dispatch({ type: types.MERCHANT_GET_REQUEST });
    return client.merchant
      .getMerchant(token)
      .then((payload) => {
        // payload.data.configurations.dashboard.language='es';
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

export function createApplication(token) {
  return function handle(dispatch) {
    dispatch({ type: types.CREATE_APPLICATION_REQUEST });
    return client.merchant
      .createApplication(token)
      .then((payload) => {
        dispatch({ type: types.CREATE_APPLICATION_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_APPLICATION_FAILURE });
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

export function saveConfiguration(token, configuration) {
  return function handle(dispatch, getState) {
    const oldConfiguration = getState().merchant.configuration;
    const newConfiguration = {
      ...oldConfiguration,
      ...configuration,
    };

    dispatch({
      type: types.CONFIGURATION_SAVE_REQUEST,
      configuration: newConfiguration,
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

export function setMerchantLanguage(token) {
  return function handle(dispatch) {
    dispatch({ type: types.SET_MERCHANT_LANG_REQUEST });

    return client.merchant
      .addMerchantProvider(token)
      .then((payload) => {
        dispatch({ type: types.SET_MERCHANT_LANG_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.SET_MERCHANT_LANG_FAILURE });
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

const initialState = {
  apps: [],
  billing: {
    providers: [],
    planDetails: {},
  },
  configuration: {
    flow: {
      required: [],
      optional: [],
    },
    style: {
      color: undefined,
      language: 'en',
    },
    system: {
      watchlists: true,
      liveness: true,
    },
    verificationSteps: [],
    supportedCountries: [],
    dashboard: {
      language: 'en',
    },
  },
  integrationCode: undefined,
  lastApplication: {},
  logoUrl: null,
  blockedAt: undefined,
};

export default createReducer(initialState, {
  [types.MERCHANT_GET_SUCCESS](state, { payload }) {
    const configuration = payload.data.configurations;
    Reflect.deleteProperty(configuration, 'version');

    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration,
        dashboard: {
          ...state.configuration.dashboard,
          ...get(configuration, 'dashboard'),
          language: get(configuration, 'dashboard.language') || get(state.configuration, 'dashboard.language'),
        },
      },
    };
  },

  [types.GET_MERCHANT_APPS_SUCCESS](state, { payload }) {
    return {
      ...state,
      apps: payload.data.apps,
      lastApplication: last(payload.data.apps) || {},
    };
  },

  [types.ADD_MERCHANT_PROVIDER_SUCCESS](state, { payload }) {
    const providers = get(payload.data, 'data.merchant.billing.providers');
    return {
      ...state,
      billing: {
        ...state.billing,
        providers,
      },
    };
  },

  [types.SET_MERCHANT_PLAN_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },

  [types.MERCHANTS_PUT_SUCCESS](state, { payload }) {
    return { ...state, ...payload.data };
  },

  [types.UPLOAD_MERCHANT_MEDIA_SUCCESS](state, { payload }) {
    return {
      ...state,
      logoUrl: payload.data.publicUrl,
    };
  },

  [types.INTEGRATION_CODE_SUCCESS](state, { payload }) {
    return {
      ...state,
      integrationCode: payload.data,
    };
  },

  [types.CONFIGURATION_SAVE_REQUEST](state, { configuration }) {
    return {
      ...state,
      configuration,
    };
  },

  [types.CONFIGURATION_SAVE_SUCCESS](state, { payload }) {
    const configuration = payload.data.configurations;
    Reflect.deleteProperty(configuration, 'version');
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration,
      },
    };
  },

  [types.CONFIGURATION_SAVE_SUCCESS](state, { payload }) {
    const configuration = payload.data.configurations;
    Reflect.deleteProperty(configuration, 'version');
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration,
      },
    };
  },

  [types.CREATE_APPLICATION_SUCCESS](state, { payload }) {
    return {
      ...state,
      apps: [
        ...state.apps,
        { clientId: payload.data.id, clientSecret: payload.data.secret },
      ],
    };
  },
});
