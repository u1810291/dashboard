import { MerchantTags } from 'models/Merchant.model';
import { createSelector } from 'reselect';
import { selectCurrentFlow, selectMerchantTags, selectVerificationPattern } from 'state/merchant/merchant.selectors';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';

export const selectESignaturePattern = createSelector(
  selectVerificationPattern,
  (pattern) => pattern[VerificationPatternTypes.ESignatureDocuments],
);

export const selectESignature = createSelector(
  selectCurrentFlow,
  (data) => data?.electronicSignature,
);

export const selectESignatureAcceptanceCriteria = createSelector(
  selectESignature,
  (data) => data?.acceptanceCriteria,
);

export const selectESignatureDocuments = createSelector(
  selectESignature,
  (data) => data?.templates,
);

export const selectCanUseESignature = createSelector(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseESignature),
);
