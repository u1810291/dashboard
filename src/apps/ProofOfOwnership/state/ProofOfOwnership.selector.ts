import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';

export const selectCanUseProofOfOwnership = createSelector(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseProofOfOwnership),
);
