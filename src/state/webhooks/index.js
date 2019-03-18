import { createReducer, createTypesSequence } from 'src/state/utils'
import { get, fromPairs } from 'lodash'
import client from 'src/lib/client'

export const types = {
  ...createTypesSequence('WEBHOOKS_SUBSCRIBE'),
  ...createTypesSequence('WEBHOOKS_DELETE'),
  ...createTypesSequence('WEBHOOKS_LIST'),
  ...createTypesSequence('WEBHOOKS_SAMPLES_LIST')
}

export function subscribeToWebhook(token, data) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_SUBSCRIBE_REQUEST })
    return client.webhooks
      .subscribeToWebhook(token, data)
      .then(payload => {
        dispatch({ type: types.WEBHOOKS_SUBSCRIBE_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.WEBHOOKS_SUBSCRIBE_FAILURE })
        const details = get(error, 'response.data.details')
        if (details) {
          throw fromPairs(details.map(detail => [detail.path.join('.'), detail.message]))
        } else {
          throw error
        }
      })
  }
}

export function deleteWebhook(token, id, clearState = true) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_DELETE_REQUEST })
    return client.webhooks
      .deleteWebhook(token, id)
      .then(payload => {
        if (clearState) {
          dispatch({ type: types.WEBHOOKS_DELETE_SUCCESS, payload })
        }
        return payload
      })
      .catch(error => {
        dispatch({ type: types.WEBHOOKS_DELETE_FAILURE })
        throw error
      })
  }
}

export function getWebhooks(token) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_LIST_REQUEST })
    return client.webhooks
      .getWebhooks(token)
      .then(payload => {
        dispatch({ type: types.WEBHOOKS_LIST_SUCCESS, payload, token })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.WEBHOOKS_LIST_FAILURE })
        throw error
      })
  }
}

export function getWebhooksSamples(token) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_SAMPLES_LIST_REQUEST })
    return client.webhooks
      .getWebhooksSamples(token)
      .then(payload => {
        dispatch({ type: types.WEBHOOKS_SAMPLES_LIST_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.WEBHOOKS_SAMPLES_LIST_FAILURE })
        throw error
      })
  }
}

const initialState = {
  lastWebhook: {},
  webhooks: {},
  testWebhooks: []
}

const reducer = createReducer(initialState, {
  [types.WEBHOOKS_LIST_SUCCESS]: function(state, { payload, token }) {
    return {
      ...state,
      webhooks: {
        ...state.webhooks,
        [token]: payload.data || []
      }
    }
  },
  [types.WEBHOOKS_SAMPLES_LIST_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      testWebhooks: payload.data
    }
  }
})

export default reducer
