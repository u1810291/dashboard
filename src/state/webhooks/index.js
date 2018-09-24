import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'

export const types = {
  ...createTypesSequence('WEBHOOKS_SUBSCRIBE'),
  ...createTypesSequence('WEBHOOKS_LIST'),
}

export function subscribeToWebhook(token, data) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_SUBSCRIBE_REQUEST })
    return client.webhooks.subscribeToWebhook(token, data)
    .then(payload => {
      dispatch({ type: types.WEBHOOKS_SUBSCRIBE_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.WEBHOOKS_SUBSCRIBE_FAILURE })
      throw error
    })
  }
}

export function getWebhooks(token) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_LIST_REQUEST })
    return client.webhooks.getWebhooks(token)
    .then(payload => {
      dispatch({ type: types.WEBHOOKS_LIST_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.WEBHOOKS_LIST_FAILURE })
      throw error
    })
  }
}

const initialState = {
}

const reducer = createReducer(initialState, {
  [types.WEBHOOKS_SUBSCRIBE_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      ...payload.data
    }
  },
  [types.WEBHOOKS_LIST_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      ...(payload.data[payload.data.length - 1] || {})
    }
  },
})

export default reducer
