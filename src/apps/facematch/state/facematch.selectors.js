import { createSelector } from 'reselect';
import { selectCurrentFlow } from '../../../state/merchant/merchant.selectors';

export const selectFacematchThreshold = createSelector(
  selectCurrentFlow,
  (flow) => flow.facematchThreshold,
);
