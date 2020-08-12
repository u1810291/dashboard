import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { SliceNames, BILLING_STORE_KEY } from './billing.store';

const selectBillingStore = (state) => state[BILLING_STORE_KEY];

// -- plan list

export const selectPlanCollection = createSelector(
  selectBillingStore,
  (store) => store[SliceNames.PlanList],
);

// -- current plan

export const selectPlanDetailsModel = createSelector(
  selectBillingStore,
  (store) => store[SliceNames.PlanDetails],
);

export const selectCurrentPlanId = createSelector(
  selectPlanDetailsModel,
  selectModelValue((value) => (value.activatedAt ? value.plan : null)),
);

// -- providers

export const selectHasBilling = createSelector(
  selectPlanDetailsModel,
  selectLoadableValue((value) => value.activatedAt && value.plan && value.provider),
);

// -- current

export const selectCurrentPlanFullModel = createSelector(
  selectPlanCollection,
  selectPlanDetailsModel,
  selectLoadableValue((list, details) => (details.isLoaded
    ? list.find((item) => item._id === details.value.plan)
    : null)),
);

export const selectCardModel = createSelector(
  selectBillingStore,
  (store) => store[SliceNames.Card],
);
