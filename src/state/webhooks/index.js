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
  lastWebhook: {},
  testWebhooks: [
    {
      steps: ['face', 'passport'],
      fullName: 'Tommy Foster',
      dateCreated: '2018/08/21 03:11:00',
      "status": "verified",
      "pictures": [{
        "url": "https://pbs.twimg.com/ad_img/983311003340468224/DiJhYv-4?format=jpg&name=orig",
        "label": "Face Verification"
      }, {
        "url": "https://pbs.twimg.com/card_img/1044282260378181633/4aWRfr8L?format=jpg&name=600x314",
        "label": "National ID"
      }],
      "contents": "{\"dateUpdated\":\"2018-06-20T03:02:48.849Z\",\"dateCreated\":\"2018-06-20T03:02:48.849Z\",\"eventName\":\"document_uploaded\",\"id\":\"5b29c3d8d1d03d7a92eed199\",\"_links\":{\"resource\":{\"href\":\"https://api.mati.io/api/v1/documents/5b29c3d8d1d03d7a92eed197\",\"resource-type\":\"document\"},\"self\":{\"href\":\"https://api.mati.io/api/v1/events/5b29c3d8d1d03d7a92eed199\",\"resource-type\":\"event\"}}}"
    }
  ]
}

const reducer = createReducer(initialState, {
  [types.WEBHOOKS_SUBSCRIBE_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      lastWebhook: payload.data
    }
  },
  [types.WEBHOOKS_LIST_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      testWebhooks: payload.data
    }
  },
})

export default reducer
