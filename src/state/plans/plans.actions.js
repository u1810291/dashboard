import * as api from 'lib/client/plans';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  PLANS_INIT: 'PLANS_INIT',
  ...createTypesSequence('CURRENT_PLAN_GET'),
  ...createTypesSequence('PLAN_GET'),
  ...createTypesSequence('PLAN_SET'),
  ...createTypesSequence('PLAN_DELETE'),
  ...createTypesSequence('PLANS_GET'),
  ...createTypesSequence('PROVIDER_ADD'),
};

export const initPlans = (payload) => (dispatch) => {
  dispatch({ type: types.PLANS_INIT, payload });
};

export const getPlans = () => async (dispatch, getState) => {
  dispatch({ type: types.PLANS_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getPlans(token);
    const rows = (payload.data.rows || [])
      .map((plan) => ({
        ...plan,
        supportLevel: (['Regular', 'Growth'].includes(plan.name)) ? 1 : 0,
      }))
      .sort((a, b) => a.order - b.order);
    dispatch({ type: types.PLANS_GET_SUCCESS, payload: rows });
  } catch (error) {
    dispatch({ type: types.PLANS_GET_FAILURE });
    throw error;
  }
};

export const getCurrentPlan = () => async (dispatch, getState) => {
  dispatch({ type: types.CURRENT_PLAN_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getCurrentPlan(token);
    dispatch({ type: types.CURRENT_PLAN_GET_SUCCESS, payload: payload.data });
  } catch (error) {
    dispatch({ type: types.CURRENT_PLAN_GET_FAILURE });
    throw error;
  }
};

export const getPlan = (id) => async (dispatch, getState) => {
  dispatch({ type: types.PLAN_GET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getPlan(token, id);
    dispatch({ type: types.PLAN_GET_SUCCESS, payload: payload.data });
    return payload;
  } catch (error) {
    dispatch({ type: types.PLAN_GET_FAILURE });
    throw error;
  }
};

export const setPlan = (id) => async (dispatch, getState) => {
  dispatch({ type: types.PLAN_SET_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.setPlan(token, id);
    dispatch({ type: types.PLAN_SET_SUCCESS, payload: payload.data.billing });
  } catch (error) {
    dispatch({ type: types.PLAN_SET_FAILURE, error });
    throw error;
  }
};

export const cancelPlan = () => async (dispatch, getState) => {
  dispatch({ type: types.PLAN_DELETE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.cancelPlan(token);
    dispatch({ type: types.PLAN_DELETE_SUCCESS, payload: payload.data.billing });
  } catch (error) {
    dispatch({ type: types.PLAN_DELETE_FAILURE, error });
    throw error;
  }
};

export const providerAdd = (id) => async (dispatch, getState) => {
  dispatch({ type: types.PROVIDER_ADD_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.addProvider(token, id);
    // TODO @dkchv: wtf???
    dispatch({ type: types.PROVIDER_ADD_SUCCESS, payload: payload.data.data.merchant.billing });
  } catch (error) {
    dispatch({ type: types.PROVIDER_ADD_FAILURE, error });
    throw error;
  }
};
