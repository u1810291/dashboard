import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { createSelector } from 'reselect';
import { selectCurrentFlow, selectVerificationPattern, selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from '../../../models/Merchant.model';

export const selectPhoneOwnership = createSelector(
  selectCurrentFlow,
  (flow) => flow.phoneOwnership || {},
);

export const selectSenderName = createSelector(
  selectPhoneOwnership,
  (phoneOwnership) => phoneOwnership.companyName,
);

export const selectPhoneValidationMode = createSelector(
  selectVerificationPattern,
  (patterns) => patterns[VerificationPatternTypes.PhoneOwnershipValidation],
);

export const selectCanUsePhoneValidation = createSelector(
  selectMerchantTags,
  (tags: MerchantTags[]): boolean => tags.includes(MerchantTags.CanUsePhoneValidation),
);
