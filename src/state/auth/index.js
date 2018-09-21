import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'

export const types = {
  ...createTypesSequence('AUTH_SIGNIN'),
  ...createTypesSequence('AUTH_SIGNOUT'),
  ...createTypesSequence('AUTH_SIGNUP'),
  ...createTypesSequence('AUTH_RECOVERY'),
}

export function signIn(credentials) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_SIGNIN_REQUEST })
    return client.auth.signin(credentials)
    .then(payload => {
      dispatch({ type: types.AUTH_SIGNIN_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.AUTH_SIGNIN_FAILURE })
      throw error
    })
  }
}

export function signUp(credentials) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_SIGNUP_REQUEST })
    return client.auth.signup(credentials)
    .then(payload => {
      dispatch({ type: types.AUTH_SIGNUP_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.AUTH_SIGNUP_FAILURE })
      throw error
    })
  }
}

export function signOut() {
  return function(dispatch) {
    dispatch({ type: types.AUTH_SIGNOUT_REQUEST })
  }
}

export function passwordRecovery(credentials) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_RECOVERY_REQUEST })
    return client.auth.recovery(credentials)
    .then(payload => {
      dispatch({ type: types.AUTH_RECOVERY_SUCCESS, payload })
      return payload
    })
    .catch(error => {
      dispatch({ type: types.AUTH_RECOVERY_FAILURE })
      throw error
    })
  }
}

const initialState = {}

const reducer = createReducer(initialState, {
  [types.AUTH_SIGNIN_SUCCESS]: function(state, { payload: { data: { token, user } }}) {
    return {
      ...state,
      token,
      user
    }
  },

  [types.AUTH_SIGNUP_SUCCESS]: function(state, { payload: { data: { token, user } }}) {
    return {
      ...state,
      token,
      user
    }
  },

  [types.AUTH_SIGNOUT_REQUEST]: function() {
    return initialState
  }
})

export default reducer
