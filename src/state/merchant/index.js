import { get } from 'lodash';
import { createReducer, createTypesSequence } from 'state/utils'
import client from 'lib/client'
import { store } from 'components/store-provider'

export * from './consts'

export const types = {
  ...createTypesSequence('MERCHANT_GET'),
  ...createTypesSequence('MERCHANT_STATISTIC_GET'),
  ...createTypesSequence('MERCHANT_STATISTIC_FILTER_GET'),
  ...createTypesSequence('MERCHANTS_PUT'),
  ...createTypesSequence('CONFIGURATION_SAVE'),
  ...createTypesSequence('INTEGRATION_CODE'),
  ...createTypesSequence('GET_MERCHANT_APPS'),
  ...createTypesSequence('SET_MERCHANT_PLAN'),
  ...createTypesSequence('SET_MERCHANT_TOKEN'),
  ...createTypesSequence('UPDATE_MERCHANT_PLAN'),
  ...createTypesSequence('CREATE_APPLICATION'),
  ...createTypesSequence('SET_MERCHANT_LANG'),
}

export function getMerchant(token) {
  return function(dispatch) {
    dispatch({ type: types.MERCHANT_GET_REQUEST })
    return client.merchant
      .getMerchant(token)
      .then(payload => {
        // payload.data.configurations.dashboard.language='es';
        dispatch({ type: types.MERCHANT_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.MERCHANT_GET_FAILURE })
        throw error
      })
  }
}

export function getMerchantStatistic(token) {
  return function(dispatch) {
    dispatch({ type: types.MERCHANT_STATISTIC_GET_REQUEST })
    return client.merchant
      .getMerchantStatistic(token)
      .then(payload => {
        dispatch({ type: types.MERCHANT_STATISTIC_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.MERCHANT_STATISTIC_GET_FAILURE })
        throw error
      })
  }
}

export function getMerchantStatisticFilter(token, filter) {
  return function(dispatch) {
    dispatch({ type: types.MERCHANT_STATISTIC_FILTER_GET_REQUEST })
    return client.merchant
      .getMerchantStatisticFilter(token, filter)
      .then(payload => {
        dispatch({ type: types.MERCHANT_STATISTIC_FILTER_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.MERCHANT_STATISTIC_FILTER_GET_FAILURE })
        throw error
      })
  }
}

export function putMerchants(token, credentials) {
  return function(dispatch) {
    dispatch({ type: types.MERCHANTS_PUT_REQUEST })
    return client.merchant
      .putMerchants(token, credentials)
      .then(payload => {
        dispatch({ type: types.MERCHANTS_PUT_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.MERCHANTS_PUT_FAILURE })
        throw error
      })
  }
}

export function getMerchantApps(token) {
  return function(dispatch) {
    dispatch({ type: types.GET_MERCHANT_APPS_REQUEST })
    return client.merchant
      .getMerchantApps(token)
      .then(payload => {
        dispatch({ type: types.GET_MERCHANT_APPS_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.GET_MERCHANT_APPS_FAILURE })
        throw error
      })
  }
}

export function createApplication(token) {
  return function(dispatch) {
    dispatch({ type: types.CREATE_APPLICATION_REQUEST })
    return client.merchant
      .createApplication(token)
      .then(payload => {
        dispatch({ type: types.CREATE_APPLICATION_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.CREATE_APPLICATION_FAILURE })
        throw error
      })
  }
}

export function getIntegrationCode(token) {
  return function(dispatch) {
    dispatch({ type: types.INTEGRATION_CODE_REQUEST })
    return client.merchant
      .getIntegrationCode(token)
      .then(payload => {
        dispatch({ type: types.INTEGRATION_CODE_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.INTEGRATION_CODE_FAILURE })
        throw error
      })
  }
}

export function saveConfiguration(token, configuration) {
  return function(dispatch) {
    const oldConfiguration = store.getState().merchant.configuration
    const newConfiguration = {
      ...oldConfiguration,
      ...configuration
    }

    dispatch({
      type: types.CONFIGURATION_SAVE_REQUEST,
      configuration: newConfiguration
    })

    return client.merchant
      .saveConfiguration(token, newConfiguration)
      .then(payload => {
        dispatch({ type: types.CONFIGURATION_SAVE_SUCCESS, payload })
        getIntegrationCode(token)
        return payload
      })
      .catch(error => {
        dispatch({ type: types.CONFIGURATION_SAVE_FAILURE })
        throw error
      })
  }
}

export function setMerchantPlan(token, planId) {
  return function(dispatch) {
    dispatch({
      type: types.SET_MERCHANT_PLAN_REQUEST,
      planId,
    })

    return client.merchant
      .setMerchantPlan(token, planId)
      .then(payload => {
        dispatch({ type: types.SET_MERCHANT_PLAN_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.SET_MERCHANT_PLAN_FAILURE })
        throw error
      })
  }
}

export function setMerchantToken(token, source) {
  return function(dispatch) {
    dispatch({ type: types.SET_MERCHANT_TOKEN_REQUEST })
    
    return client.merchant
      .setMerchantToken(token, source)
      .then(payload => {
        dispatch({ type: types.SET_MERCHANT_TOKEN_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.SET_MERCHANT_TOKEN_FAILURE })
        throw error
      })
  }
}

export function setMerchantLanguage(token, lang) {
  return function(dispatch) {
    dispatch({ type: types.SET_MERCHANT_LANG_REQUEST })

    return client.merchant
      .setMerchantToken(token)
      .then(payload => {
        dispatch({ type: types.SET_MERCHANT_LANG_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.SET_MERCHANT_LANG_FAILURE })
        throw error
      })
  }
}

const initialState = {
  integrationCode: undefined,
  apps: [],
  lastApplication: {},
  configuration: {
    flow: {
      required: [],
      optional: []
    },
    style: {
      color: undefined,
      language: 'en'
    },
    system: {
      watchlists: true,
      liveness: true
    },
    verificationSteps: [],
    supportedCountries: [],
    dashboard: {
      language: 'en'
    }
  }
}

const reducer = createReducer(initialState, {
  [types.MERCHANT_GET_SUCCESS]: function(state, { payload }) {
    const configuration = payload.data.configurations
    Reflect.deleteProperty(configuration, 'version')

    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration,
        dashboard: {
          ...state.configuration.dashboard,
          ...get(configuration, 'dashboard'),
          language: get(configuration, 'dashboard.language') || get(state.configuration, 'dashboard.language')
        }
      }
    }
  },

  [types.GET_MERCHANT_APPS_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      apps: payload.data.apps,
      lastApplication: payload.data.apps[0] || {}
    }
  },

  [types.SET_MERCHANT_PLAN_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      ...payload.data,
    }
  },

  [types.INTEGRATION_CODE_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      integrationCode: payload.data
    }
  },

  [types.CONFIGURATION_SAVE_REQUEST]: function(state, { configuration }) {
    return {
      ...state,
      configuration
    }
  },

  [types.CONFIGURATION_SAVE_SUCCESS]: function(state, { payload }) {
    const configuration = payload.data.configurations
    Reflect.deleteProperty(configuration, 'version')
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration
      }
    }
  },

  [types.CONFIGURATION_SAVE_SUCCESS]: function(state, { payload }) {
    const configuration = payload.data.configurations
    Reflect.deleteProperty(configuration, 'version')
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration
      }
    }
  },

  [types.CREATE_APPLICATION_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      apps: [
        ...state.apps,
        { clientId: payload.data.id, clientSecret: payload.data.secret }
      ]
    }
  }
})

export default reducer
