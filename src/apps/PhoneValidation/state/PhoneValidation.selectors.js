import { createSelector } from 'reselect';
import { VerificationPatternTypes } from 'models/Step.model';
import { selectCurrentFlow, selectVerificationPattern } from 'state/merchant/merchant.selectors';

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
