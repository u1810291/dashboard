import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { createSelector } from 'reselect';
import { selectCanUseProofOfOwnership } from 'apps/ProofOfOwnership';
import { selectCurrentFlow, selectVerificationPattern } from 'state/merchant/merchant.selectors';

export const selectFacematchThreshold = createSelector(
  selectCurrentFlow,
  (flow) => flow.facematchThreshold,
);

export const selectProofOfOwnership = createSelector(
  selectVerificationPattern,
  (pattern) => !!pattern[VerificationPatternTypes.ProofOfOwnership],
);

export const selectIsPOO = createSelector(
  selectCanUseProofOfOwnership,
  selectProofOfOwnership,
  (tag, value) => tag && value,
);
