import { createReducer, createTypesSequence } from 'state/utils';
import client from 'lib/client';

export const types = {
  ...createTypesSequence('CARD_GET'),
  ...createTypesSequence('PLAN_GET'),
  ...createTypesSequence('PLANS_GET'),
  ...createTypesSequence('PLANS_DELETE'),
};

export function getPlans(token) {
  return function handle(dispatch) {
    dispatch({ type: types.PLANS_GET_REQUEST });

    return client.plans
      .getPlans(token)
      .then((payload) => {
        // TODO: temporary solution before BE implement "supportLevel" property
        // https://matibiometrics.atlassian.net/browse/BAC-4423
        (payload.data.rows || []).map((plan) => {
          plan.supportLevel = (['Regular', 'Growth'].includes(plan.name)) ? 1 : 0;
          return plan;
        });
        dispatch({ type: types.PLANS_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.PLANS_GET_FAILURE });
        throw error;
      });
  };
}

export function getMerchantPlan(id) {
  return function handle(dispatch) {
    dispatch({ type: types.CARD_GET_REQUEST });

    return client.plans
      .getMerchantPlan(id)
      .then((payload) => {
        dispatch({ type: types.CARD_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.CARD_GET_FAILURE });
        throw error;
      });
  };
}

export function getPlan(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.PLAN_GET_REQUEST });

    return client.plans
      .getPlan(token, id)
      .then((payload) => {
        dispatch({ type: types.PLAN_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.PLAN_GET_FAILURE });
        throw error;
      });
  };
}

export function cancelPlan(token) {
  return function handle(dispatch) {
    dispatch({ type: types.PLANS_DELETE_REQUEST });
    return client.plans
      .cancelPlans(token)
      .then((payload) => {
        dispatch({ type: types.PLANS_DELETE_SUCCESS, payload });
        dispatch({
          type: 'SET_MERCHANT_PLAN_SUCCESS',
          payload,
        });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.PLANS_DELETE_FAILURE });
        throw error;
      });
  };
}

const initialState = {
  merchant: {
    billing: null,
  },
  rows: [],
};

const reducer = createReducer(initialState, {
  [types.PLANS_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },
  [types.PLANS_DELETE_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload.data,
    };
  },
});

export default reducer;
