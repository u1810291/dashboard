import { createSelector } from 'reselect';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export const selectCanUsePayrollAccountDataFlow = createSelector(
  selectMerchantTags,
  (tags: MerchantTags[]): boolean => tags.includes(MerchantTags.CanUseFinancialInformationPayrollAccountsRetrieving),
);
