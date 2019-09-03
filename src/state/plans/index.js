import { createReducer, createTypesSequence } from 'state/utils'
import client from 'lib/client'

export const types = {
  ...createTypesSequence('CARD_GET'),
  ...createTypesSequence('PLAN_GET'),
  ...createTypesSequence('PLANS_GET'),
  ...createTypesSequence('PLANS_DELETE'),
}

export function getPlans(token, page) {
  return function(dispatch) {
    dispatch({ type: types.PLANS_GET_REQUEST })

    return client.plans.getPlans(token, page)
      .then(payload => {
        dispatch({ type: types.PLANS_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.PLANS_GET_FAILURE })
        throw error
      })
  }
}

export function getMerchantPlan(id) {
  return function(dispatch) {
    dispatch({ type: types.CARD_GET_REQUEST })

    return client.plans.getMerchantPlan(id)
      .then(payload => {
        dispatch({ type: types.CARD_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.CARD_GET_FAILURE })
        throw error
      })
  }
}

export function getPlan(token, id) {
  return function(dispatch) {
    dispatch({ type: types.PLAN_GET_REQUEST })

    return client.plans.getPlan(token, id)
      .then(payload => {
        dispatch({ type: types.PLAN_GET_SUCCESS, payload })
        return payload
      })
      .catch(error => {
        dispatch({ type: types.PLAN_GET_FAILURE })
        throw error
      })
  }
}

export function cancelPlan(token) {
  return function(dispatch) {
    dispatch({ type: types.PLANS_DELETE_REQUEST })
    return client.plans.cancelPlans(token)
      .then(payload => {
        dispatch({ type: types.PLANS_DELETE_SUCCESS, payload })
        dispatch({
          type: 'SET_MERCHANT_PLAN_SUCCESS',
          payload,
        });
        return payload
      })
      .catch(error => {
        dispatch({ type: types.PLANS_DELETE_FAILURE })
        throw error
      })
  }
}

const initialState = {
  merchant: {
    billing: null
  },
}

const reducer = createReducer(initialState, {
  [types.PLANS_GET_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      ...payload.data,
    }
  },
  [types.PLANS_DELETE_SUCCESS]: function(state, { payload }) {
    return {
      ...state,
      ...payload.data,
    }
  },
})

export default reducer
