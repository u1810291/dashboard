export function selectPlanDetails({ plans }) {
  return plans.planDetails;
}

export function selectCardDetails({ plans }) {
  return plans.cardDetails;
}

export function selectPlanList({ plans }) {
  return plans.rows;
}

export function selectCurrentPlanId({ plans }) {
  const plan = plans.planDetails;
  return plan && !!plan.activatedAt
    ? plan.plan
    : null;
}

export function selectCurrentPlan(state) {
  const plan = state.plans.planDetails;
  if (!plan) {
    return null;
  }

  const rows = selectPlanList(state);
  return rows.find((item) => item._id === plan.plan);
}

export function selectProviders({ plans }) {
  return plans.providers;
}
