import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'
import { store } from 'src/components/store-provider'

export const types = {
  ...createTypesSequence('MERCHANT_GET'),
  ...createTypesSequence('CONFIGURATION_SAVE'),
  ...createTypesSequence('INTEGRATION_CODE'),
  ...createTypesSequence('GET_MERCHANT_APPS'),
}

export const AVAILABLE_COLORS = [
  'blue',
  'green',
  'red',
  'pink',
  'orange',
  'yellow'
]

export const AVAILABLE_DOCUMENT_TYPES = [
  'liveness',
  'passport',
  'national-id',
  'driving-license',
  'proof-of-residency'
]

export const MANDATORY_DOCUMENT_TYPES = ['liveness']

export const AVAILABLE_LANGUAGES = [
  'en',
  'es',
  'fr',
  'pt'
]

export function getMerchant(token) {
  return function(dispatch) {
    dispatch({ type: types.MERCHANT_GET_REQUEST })
    return client.merchant.getMerchant(token)
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

export function getMerchantApps(token) {
  return function(dispatch) {
    dispatch({ type: types.GET_MERCHANT_APPS_REQUEST })
    return client.merchant.getMerchantApps(token)
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

export function getIntegrationCode(token) {
  return function(dispatch) {
    dispatch({ type: types.INTEGRATION_CODE_REQUEST })
    return client.merchant.getIntegrationCode(token)
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
      ...configuration,
      version: (parseInt(oldConfiguration.version, 10) || 0) + 1
    }

    dispatch({ type: types.CONFIGURATION_SAVE_REQUEST, configuration: newConfiguration })

    return client.merchant.saveConfiguration(token, newConfiguration)
    .then(payload => {
      dispatch({ type: types.CONFIGURATION_SAVE_SUCCESS, payload })
      getIntegrationCode(token);
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
  anyApplication: {},
  configuration: {
    version: 0,
    documents: {
      required: [],
      optional: []
    },
    color: undefined,
    language: 'en',
    globalWatchList: false,
    onboardingModalShown: true
  }
}

const reducer = createReducer(initialState, {
  [types.MERCHANT_GET_SUCCESS]: function(state, { payload }) {
    const configuration = payload.data.configurations[payload.data.configurations.length - 1]
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...configuration,
        onboardingModalShown: configuration.onboardingModalShown
      }
    }
  },

  [types.GET_MERCHANT_APPS_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      apps: payload.data.apps,
      anyApplication: payload.data.apps[0] || {}
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
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...payload.data.configurations[payload.data.configurations.length - 1]
      }
    }
  },
})

export default reducer
