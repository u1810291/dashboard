import { createReducer, createTypesSequence } from 'state/utils'
import client from 'lib/client'


export const types = {
  ...createTypesSequence('COUNTRIES_GET'),
}

export function getCountries(token) {
  return function(dispatch) {
    dispatch({ type: types.COUNTRIES_GET_REQUEST })
    return client.countries.getCountries(token)
      .then(payload => {
        dispatch({ type: types.COUNTRIES_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.COUNTRIES_GET_FAILURE })
        throw error
      })
  }
}

const initialState = {
  countries: [],
  isLoading: true
}

const reducer = createReducer(initialState, {
  [types.COUNTRIES_GET_REQUEST]: function(state) {
    return {
      ...state,
      isLoading: true
    }
  },
  [types.COUNTRIES_GET_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      countries: payload.data,
      isLoading: false
    }
  }
})

export default reducer
