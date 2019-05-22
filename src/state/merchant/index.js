import { createReducer, createTypesSequence } from 'state/utils'
import client from 'lib/client'
import { store } from 'components/store-provider'

export * from './consts'

export const types = {
  ...createTypesSequence('MERCHANT_GET'),
  ...createTypesSequence('MERCHANTS_PUT'),
  ...createTypesSequence('CONFIGURATION_SAVE'),
  ...createTypesSequence('INTEGRATION_CODE'),
  ...createTypesSequence('GET_MERCHANT_APPS'),
  ...createTypesSequence('CREATE_APPLICATION')
}

export function getMerchant(token) {
  return function(dispatch) {
    dispatch({ type: types.MERCHANT_GET_REQUEST })
    return client.merchant
      .getMerchant(token)
      .then(payload => {
        dispatch({ type: types.MERCHANT_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.MERCHANT_GET_FAILURE })
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
    dashboard: {}
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
        ...configuration
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
