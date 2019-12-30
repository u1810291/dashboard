import { BillingActionGroups } from 'apps/billing/state/billing.model';
import { selectCurrentPlanId } from 'apps/billing/state/billing.selectors';
import * as api from 'lib/client/plans';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { collectionUpsert, createTypesSequence } from 'state/utils';

export const billingActionTypes = {
  ...createTypesSequence(BillingActionGroups.PlanList),
  ...createTypesSequence(BillingActionGroups.PlanDetails),
  ...createTypesSequence(BillingActionGroups.Card),
  ...createTypesSequence(BillingActionGroups.ProviderList),
};

export const billingInit = (data = {}) => (dispatch) => {
  dispatch({ type: billingActionTypes.PLAN_DETAILS_SUCCESS, payload: data.planDetails });
  dispatch({ type: billingActionTypes.PROVIDER_LIST_SUCCESS, payload: data.providers });
};

export const planListLoad = (isReset = false) => async (dispatch, getState) => {
  dispatch({ type: billingActionTypes.PLAN_LIST_REQUEST });
  try {
    const state = getState();
    const token = selectAuthToken(state);
    const { data } = await api.getPlans(token);
    let plans = (data.rows || [])
      .filter((item) => !item.isArchived)
      .sort((a, b) => a.order - b.order);

    const currentPlanId = selectCurrentPlanId(state);
    const isCurrentLoaded = plans.find((item) => item._id === currentPlanId);
    if (currentPlanId && !isCurrentLoaded) {
      const response = await api.getPlan(token, currentPlanId);
      plans = collectionUpsert(plans, response.data);
    }

    dispatch({ type: billingActionTypes.PLAN_LIST_SUCCESS, payload: plans, isReset });
  } catch (error) {
    dispatch({ type: billingActionTypes.PLAN_LIST_FAILURE, error });
    throw error;
  }
};

export const planUpdate = (id) => async (dispatch, getState) => {
  dispatch({ type: billingActionTypes.PLAN_DETAILS_UPDATING });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.setPlan(token, id);
    dispatch(billingInit(data.billing));
    dispatch(planListLoad(true));
  } catch (error) {
    dispatch({ type: billingActionTypes.PLAN_DETAILS_FAILURE });
    throw error;
  }
};

export const planCancel = () => async (dispatch, getState) => {
  dispatch({ type: billingActionTypes.PLAN_DETAILS_UPDATING });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.cancelPlan(token);
    dispatch(billingInit(data.billing));
    dispatch(planListLoad(true));
  } catch (error) {
    dispatch({ type: billingActionTypes.PLAN_DETAILS_FAILURE });
    throw error;
  }
};

export const currentPlanLoad = () => async (dispatch, getState) => {
  dispatch({ type: billingActionTypes.PLAN_DETAILS_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getCurrentPlan(token);
    dispatch({ type: billingActionTypes.PLAN_DETAILS_SUCCESS, payload: data.planDetails });
    dispatch({ type: billingActionTypes.CARD_SUCCESS, payload: data.cardDetails });
  } catch (error) {
    dispatch({ type: billingActionTypes.PLAN_DETAILS_FAILURE, error });
    throw error;
  }
};

export const providerListUpdate = (id) => async (dispatch, getState) => {
  dispatch({ type: billingActionTypes.PROVIDER_LIST_UPDATING });
  try {
    const state = getState();
    const token = selectAuthToken(state);
    const payload = await api.addProvider(token, id);
    // TODO @dkchv: wtf???
    dispatch(billingInit(payload.data.data.merchant.billing));
    dispatch(planListLoad(true));
  } catch (error) {
    dispatch({ type: billingActionTypes.PROVIDER_LIST_FAILURE, error });
    throw error;
  }
};
