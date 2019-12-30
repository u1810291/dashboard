import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { SliceNames } from './billing.model';

const selectBillingStore = (state) => state.billing;

// -- plan list

export const selectPlanCollection = createSelector(
  selectBillingStore,
  (store) => store[SliceNames.PlanList],
);

export const selectRegularPlanCollection = createSelector(
  selectPlanCollection,
  selectLoadableValue((list) => list.filter((item) => !item.isCustom)),
);
export const selectCustomPlanCollection = createSelector(
  selectPlanCollection,
  selectLoadableValue((list) => list.filter((item) => item.isCustom)),
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

export const selectProviderCollection = createSelector(
  selectBillingStore,
  (store) => store[SliceNames.ProviderList],
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
