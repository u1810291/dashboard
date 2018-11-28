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
  }
})

export default reducer
