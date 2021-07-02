import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { createSelector } from 'reselect';
import { selectVerificationPattern } from 'state/merchant/merchant.selectors';

export const selectPremiumAmlWatchlistsCheck = createSelector(
  selectVerificationPattern,
  (flow) => flow[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation],
);
