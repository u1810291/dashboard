import { createSelector } from 'reselect';
import { selectVerificationPattern } from 'state/merchant/merchant.selectors';
import { VerificationPatternTypes } from '../../../models/VerificationPatterns.model';

export const selectPhoneRiskValidation = createSelector(
  selectVerificationPattern,
  (patterns) => patterns[VerificationPatternTypes.PhoneRiskValidation],
);
