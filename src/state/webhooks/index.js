import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'

export const types = {
  ...createTypesSequence('WEBHOOKS_SUBSCRIBE'),
  ...createTypesSequence('WEBHOOKS_LIST'),
}

export function subscribeToWebhook(token, url) {
  return function(dispatch) {
    dispatch({ type: types.WEBHOOKS_SUBSCRIBE_REQUEST })
    return client.webhooks.subscribeToWebhook(token, { url })
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

const initialState = {
}

const reducer = createReducer(initialState, {
  [types.WEBHOOKS_SUBSCRIBE_SUCCESS]: function(state, { payload }) {
    debugger
    return state
  },
})

export default reducer
