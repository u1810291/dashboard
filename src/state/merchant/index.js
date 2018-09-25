import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'

export const types = {
  ...createTypesSequence('MERCHANT_GET'),
  ...createTypesSequence('CONFIGURATION_SAVE'),
  ...createTypesSequence('INTEGRATION_CODE'),
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
  'face',
  'passport',
  'national-id',
  'driving-license',
  'proof-of-residency'
]

export const AVAILABLE_LANGUAGES = [
  'en',
  'es'
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
    dispatch({ type: types.CONFIGURATION_SAVE_REQUEST })
    return client.merchant.saveConfiguration(token, configuration)
    .then(payload => {
      dispatch({ type: types.CONFIGURATION_SAVE_SUCCESS, payload })
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
  configuration: {
    version: 0,
    documents: [],
    color: undefined,
    language: 'en',
    globalWatchList: false,
  }
}

const reducer = createReducer(initialState, {
  [types.MERCHANT_GET_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      ...payload.data,

      configuration: {
        ...state.configuration,
        ...payload.data.configurations[payload.data.configurations.length - 1]
      }
    }
  },

  [types.INTEGRATION_CODE_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      integrationCode: payload.data
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
