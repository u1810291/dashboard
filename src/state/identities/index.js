import { isEmpty } from 'lodash';
import { createReducer, createTypesSequence } from 'src/state/utils'
import {
  buildInitialMonthlyIdentities,
  computeMonthlyStatisticsForIdentities
} from './analytics'
import client from 'src/lib/client'

window.client = client

export const types = {
  ...createTypesSequence('IDENTITY_LIST'),
  ...createTypesSequence('IDENTITY_FETCH'),
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),
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

export function getIdentityWithNestedData(token, id) {
  return function(dispatch) {
    dispatch({ type: types.IDENTITY_FETCH_REQUEST })
    return client.identities.getIdentityWithNestedData(token, id)
    .then(identity => {
      dispatch({ type: types.IDENTITY_FETCH_SUCCESS, identity })
      return identity
    })
    .catch(error => {
      dispatch({ type: types.IDENTITY_FETCH_FAILURE })
      throw error
    })
  }
}

export function patchIdentity(token, id, data) {
  return function(dispatch) {
    dispatch({ type: types.IDENTITY_PATCH_REQUEST, payload: {id, data} })
    return client.identities.patchIdentity(token, id, data)
      .then(payload => {
        dispatch({ type: types.IDENTITY_PATCH_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.IDENTITY_PATCH_FAILURE })
        throw error
      })
  }
}

export function patchDocument(token, identityId, id, fields) {
  return function(dispatch) {
    dispatch({ type: types.DOCUMENT_PATCH_REQUEST, payload: { identityId, id, fields } })
    return client.identities.patchDocument(token, id, fields)
      .then(payload => {
        dispatch({ type: types.DOCUMENT_PATCH_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.DOCUMENT_PATCH_FAILURE })
        throw error
      })
  }
}

const initialState = {
  isLoading: true,
  identities: [],
  instances: {},
  monthlyIdentities: buildInitialMonthlyIdentities(12)
}

const reducer = createReducer(initialState, {
  [types.IDENTITY_FETCH_SUCCESS]: function(state, { identity }) {
    return {
      ...state,
      instances: {
        ...state.instances,
        [identity.id]: identity
      }
    }
  },

  [types.IDENTITY_LIST_REQUEST]: function(state) {
    return {
      ...state,
      isLoading: true
    }
  },

  [types.IDENTITY_LIST_SUCCESS]: function(state, { payload }) {
    const monthlyIdentities = isEmpty(payload.data)
      ? buildInitialMonthlyIdentities(12)
      : computeMonthlyStatisticsForIdentities(payload.data)

    return {
      ...state,
      isLoading: false,
      identities: payload.data,
      monthlyIdentities
    }
  },
  [types.IDENTITY_PATCH_REQUEST]: function(state, { payload }) {
    let identities = [].concat(state.identities)
    let instances = {...state.instances}
    if (instances[payload.id]) {
      instances[payload.id].status = payload.data.status
    }
    let identityToEdit = identities.find((identity) => identity.id === payload.id)
    if (identityToEdit) {
      identityToEdit.status = payload.data.status
    }
    return {
      ...state,
      identities
    }
  },
  [types.DOCUMENT_PATCH_REQUEST]: function(state, { payload }) {
    let instances = {...state.instances}
    if (!instances[payload.identityId]) return state
    let documentToEdit = instances[payload.identityId].documents.find((doc) => {
      return doc.id === payload.id
    })
    if (!documentToEdit) return state
    documentToEdit.fields.forEach(docField => {
      payload.fields.forEach(fieldToEdit => {
        if (docField.id === fieldToEdit.id) {
          docField.value = fieldToEdit.value
        }
      })
    })
    return {
      ...state,
      instances
    }
  },
})

export default reducer
