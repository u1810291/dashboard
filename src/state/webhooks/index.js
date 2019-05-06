import { createReducer, createTypesSequence } from 'state/utils'
import { get, fromPairs } from 'lodash'
import client from 'lib/client'

export const types = {
  ...createTypesSequence('WEBHOOKS_SUBSCRIBE'),
  ...createTypesSequence('WEBHOOKS_DELETE'),
  ...createTypesSequence('WEBHOOKS_LIST')
}

export function subscribeToWebhook(token, clientId, data) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_SUBSCRIBE_REQUEST })
    return client.webhooks
      .subscribeToWebhook(token, clientId, data)
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

export function deleteWebhook(token, clientId, id) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_DELETE_REQUEST })
    return client.webhooks
      .deleteWebhook(token, clientId, id)
      .then(payload => {
        dispatch({ type: types.WEBHOOKS_DELETE_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.WEBHOOKS_DELETE_FAILURE })
        throw error
      })
  }
}

export function getWebhooks(token, clientId) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_LIST_REQUEST })
    return client.webhooks
      .getWebhooks(token, clientId)
      .then(payload => {
        dispatch({ type: types.WEBHOOKS_LIST_SUCCESS, payload, clientId })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.WEBHOOKS_LIST_FAILURE })
        throw error
      })
  }
}

const initialState = {
  webhooks: {}
}

const reducer = createReducer(initialState, {
  [types.WEBHOOKS_LIST_SUCCESS]: function(state, { payload, clientId }) {
    return {
      ...state,
      webhooks: {
        ...state.webhooks,
        [clientId]: payload.data || []
      }
    }
  }
})

export default reducer
