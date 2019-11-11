import * as api from 'lib/client/plans';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('CARD_GET'),
  ...createTypesSequence('PLAN_GET'),
  ...createTypesSequence('PLANS_GET'),
  ...createTypesSequence('PLANS_DELETE'),
};

export const getPlans = () => async (dispatch, getState) => {
  dispatch({ type: types.PLANS_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getPlans(token);
    (payload.data.rows || []).map((plan) => {
      plan.supportLevel = (['Regular', 'Growth'].includes(plan.name)) ? 1 : 0;
      return plan;
    });
    dispatch({ type: types.PLANS_GET_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.PLANS_GET_FAILURE });
    throw error;
  }
};

export const getMerchantPlan = () => async (dispatch, getState) => {
  dispatch({ type: types.CARD_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getMerchantPlan(token);
    dispatch({ type: types.CARD_GET_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.CARD_GET_FAILURE });
    throw error;
  }
};

export const getPlan = (id) => async (dispatch, getState) => {
  dispatch({ type: types.PLAN_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getPlan(token, id);
    dispatch({ type: types.PLAN_GET_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.PLAN_GET_FAILURE });
    throw error;
  }
};

export const cancelPlan = () => async (dispatch, getState) => {
  dispatch({ type: types.PLANS_DELETE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.cancelPlans(token);
    dispatch({ type: types.PLANS_DELETE_SUCCESS, payload });
    dispatch({ type: 'SET_MERCHANT_PLAN_SUCCESS', payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.PLANS_DELETE_FAILURE });
    throw error;
  }
};
