import { createReducer, createTypesSequence } from 'state/utils'
import client from 'lib/client'
import { notification } from '../../components/notification'

export const types = {
  ...createTypesSequence('COLLABORATORS_GET'),
  ...createTypesSequence('COLLABORATORS_POST'),
  ...createTypesSequence('COLLABORATORS_PATCH'),
  ...createTypesSequence('COLLABORATORS_DELETE')
}

export function getCollaborators(token, merchantId) {
  return function(dispatch) {
    return client.collaborators
      .getCollaborators(token, merchantId)
      .then(payload => {
        dispatch({ type: types.COLLABORATORS_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.COLLABORATORS_GET_FAILURE })
        notification.error((error && error.response && error.response.data.message)
          || 'Something went wrong. Please retry')
        throw error
      })
  }
}


export const postCollaborators = (token, merchantId, data) => (dispatch) => {
  dispatch({ type: types.COLLABORATORS_POST_REQUEST })
  return client.collaborators.postCollaborators(token, merchantId, data)
    .then(payload => {
      dispatch({ type: types.COLLABORATORS_POST_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.COLLABORATORS_POST_FAILURE })
      notification.error((error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry')
      throw error
    })
}

export const patchCollaborators = (token, merchantId, id, data) => (dispatch) => {
  dispatch({ type: types.COLLABORATORS_PATCH_REQUEST, id })
  return client.collaborators.patchCollaborators(token, merchantId, id, data)
    .then(payload => {
      dispatch({ type: types.COLLABORATORS_PATCH_SUCCESS, payload, id })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.COLLABORATORS_PATCH_FAILURE })
      notification.error((error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry')
      throw error
    })
}

export const deleteCollaborators = (token, merchantId, id) => dispatch => {
  dispatch({ type: types.COLLABORATORS_DELETE_REQUEST })
  return client.collaborators.deleteCollaborators(token, merchantId, id)
    .then(payload => {
      dispatch({ type: types.COLLABORATORS_DELETE_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.COLLABORATORS_DELETE_FAILURE })
      notification.error((error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry')
      throw error
    })
}

const initialState = {
  isLoading: true,
  isPosting: false,
  isDeleting: false,
  isPatchingArray: [],
  collaborators: []
}

const reducer = createReducer(initialState, {
  [types.COLLABORATORS_GET_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      collaborators: payload.data,
      isLoading: false
    }
  },
  [types.COLLABORATORS_POST_REQUEST]: function(state, { payload }) {
    return {
      ...state,
      isPosting: true
    }
  },
  [types.COLLABORATORS_POST_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      collaborators: payload.data,
      isPosting: false
    }
  },
  [types.COLLABORATORS_POST_FAILURE]: function(state, { payload }) {
    return {
      ...state,
      isPosting: false
    }
  },
  [types.COLLABORATORS_PATCH_REQUEST]: function(state, { id }) {
    let isPatchingArray = [].concat(state.isPatchingArray)
    isPatchingArray.push(id)
    return {
      ...state,
      isPatchingArray
    }
  },
  [types.COLLABORATORS_PATCH_SUCCESS]: function(state, { payload, id }) {
    let isPatchingArray = [].concat(state.isPatchingArray)
    isPatchingArray = isPatchingArray.filter((item) => item !== id)
    return {
      ...state,
      collaborators: payload.data,
      isPatchingArray
    }
  },
  [types.COLLABORATORS_DELETE_REQUEST]: function(state, { payload }) {
    return {
      ...state,
      isDeleting: true
    }
  },
  [types.COLLABORATORS_DELETE_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      isDeleting: false,
      collaborators: payload.data
    }
  }
})

export default reducer



