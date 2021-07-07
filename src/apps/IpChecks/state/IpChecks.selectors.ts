import { createSelector } from 'reselect';
import { selectCurrentFlow, selectVerificationPattern } from 'state/merchant/merchant.selectors';
import { IFlow } from 'models/Flow.model';
import { AllowedRegions, IpCheckValidationTypes } from 'apps/IpCheck/models/IpCheck.model';
import { VerificationPatterns, VerificationPatternTypes } from 'models/VerificationPatterns.model';

export const selectIpCheckMode = createSelector(
  selectVerificationPattern,
  (patterns: VerificationPatterns): IpCheckValidationTypes => patterns[VerificationPatternTypes.IpValidation],
);

export const selectVpnRestriction = createSelector(
  selectVerificationPattern,
  (patterns: VerificationPatterns): boolean => patterns[VerificationPatternTypes.VpnDetection],
);

export const selectAllowedRegions = createSelector(
  selectCurrentFlow,
  (flow: IFlow): AllowedRegions[] => flow.ipValidation?.allowedRegions || [],
);
