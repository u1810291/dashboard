import { createSelector } from 'reselect';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';

export const selectAgeCheckThreshold = createSelector(
  selectCurrentFlow,
  (flow) => flow.ageThreshold,
);
