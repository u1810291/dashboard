import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export const selectCanUseIpCheck = createSelector(
  selectMerchantTags,
  // TODO @dkchv: !!! restore
  (): boolean => true,
);
