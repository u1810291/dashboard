
export const BILLING_STORE_KEY = 'billing';

export const BillingActionGroups = {
  PlanList: 'PLAN_LIST',
  PlanDetails: 'PLAN_DETAILS',
  ProviderList: 'PROVIDER_LIST',
  Card: 'CARD',
};

export const SliceNames = {
  PlanList: 'planList',
  PlanDetails: 'planDetails',
  ProviderList: 'providerList',
  Card: 'card',
};

export const BillingPlanMeta = [
  {
    name: 'Yearly',
    badge: {
      textId: 'PricingPlans.yearly.save',
    },
    bottomText: {
      textId: 'PricingPlans.yearly.note',
    },
  },
];

export const PlanState = {
  Draft: 'draft',
  Published: 'published',
  Archived: 'archived',
};

export function getBillingPlanMeta(planName) {
  return BillingPlanMeta.find((plan) => plan.name === planName);
}
