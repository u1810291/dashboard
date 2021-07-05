import { createSelector } from 'reselect';
import { selectCurrentFlow, selectVerificationPattern } from 'state/merchant/merchant.selectors';
import { VerificationPatternTypes } from '../../../models/VerificationPatterns.model';
import { EmailValidationStepModes } from '../models/EmailValidation.model';

export const selectEmailOwnership = createSelector(
  selectCurrentFlow,
  (flow) => flow.emailOwnership || {},
);

export const selectSenderName = createSelector(
  selectEmailOwnership,
  (emailOwnership) => emailOwnership.companyName || '',
);

export const selectEmailValidationThreshold = createSelector(
  selectCurrentFlow,
  (flow) => flow.emailRiskThreshold,
);

export const selectEmailValidationMode = createSelector(
  selectVerificationPattern,
  (patterns) => patterns[VerificationPatternTypes.EmailOwnershipValidation] || EmailValidationStepModes.None,
);

export const selectEmailRiskValidationMode = createSelector(
  selectVerificationPattern,
  (patterns) => patterns[VerificationPatternTypes.EmailRiskValidation] || false,
);
