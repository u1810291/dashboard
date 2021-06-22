import { createSelector } from 'reselect';
import { VerificationPatternTypes } from 'models/Step.model';
import { selectVerificationPattern } from 'state/merchant/merchant.selectors';

export const selectPhoneRiskValidation = createSelector(
  selectVerificationPattern,
  (patterns) => patterns[VerificationPatternTypes.PhoneRiskValidation],
);
