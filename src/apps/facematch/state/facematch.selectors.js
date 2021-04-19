import { MerchantTags } from 'models/Merchant.model';
import { VerificationPatternTypes } from 'models/Step.model';
import { createSelector } from 'reselect';
import { selectCurrentFlow, selectMerchantTags, selectVerificationPattern } from 'state/merchant/merchant.selectors';

export const selectFacematchThreshold = createSelector(
  selectCurrentFlow,
  (flow) => flow.facematchThreshold,
);

export const selectCanUseProofOfOwnership = createSelector(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseProofOfOwnership),
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
