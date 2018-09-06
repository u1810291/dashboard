import { createReducer, createTypesSequence } from 'src/state/utils'
import client from 'src/lib/client'

export const types = {
  ...createTypesSequence('AUTH_SIGNIN'),
  // ...createTypesSequence('AUTH_SIGNOUT'),
  // ...createTypesSequence('AUTH_SIGNUP'),
  // ...createTypesSequence('AUTH_RECOVERY'),
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
      return error
    })

  }
}

const initialState = {}

const reducer = createReducer(initialState, {
  [types.AUTH_SIGNIN_SUCCESS]: function(
    state,
    { payload: { token, user }}
  ) {
    return {
      ...state,
      token,
      user
    }
  }
})

export default reducer
