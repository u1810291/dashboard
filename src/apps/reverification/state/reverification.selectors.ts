import { createSelector } from 'reselect';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export const selectCanUseProofOfOwnership = createSelector(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseReverificationFlow),
);
