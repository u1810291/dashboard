import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'

window.client = client

export const types = {
  ...createTypesSequence('IDENTITY_LIST'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
}

export function getIdentities(token) {
  return function(dispatch) {
    dispatch({ type: types.IDENTITY_LIST_REQUEST })
    return client.identities.getIdentities(token)
    .then(payload => {
      dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.IDENTITY_LIST_FAILURE })
      throw error
    })
  }
}

export function getDocuments(token, id) {
  return function(dispatch) {
    dispatch({ type: types.IDENTITY_DOCUMENTS_LIST_REQUEST })
    return client.identities.getDocuments(token, id)
    .then(payload => {
      dispatch({ type: types.IDENTITY_DOCUMENTS_LIST_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.IDENTITY_DOCUMENTS_LIST_FAILURE })
      throw error
    })
  }
}

export function getDocumentPictures(token, id) {
  return function(dispatch) {
    dispatch({ type: types.IDENTITY_DOCUMENT_PICTURES_LIST_REQUEST })
    return client.identities.getDocumentPictures(token, id)
    .then(payload => {
      dispatch({ type: types.IDENTITY_DOCUMENT_PICTURES_LIST_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.IDENTITY_DOCUMENT_PICTURES_LIST_FAILURE })
      throw error
    })
  }
}

const initialState = {
  identities: []
}

const reducer = createReducer(initialState, {
  [types.IDENTITY_LIST_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      identities: payload.data
    }
  },
})

export default reducer
