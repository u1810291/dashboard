import { createSelector } from 'reselect';
import { MerchantTags, IMerchantSettings, ISenderEmail } from 'models/Merchant.model';
import { selectMerchantTags, selectMerchantSettings } from 'state/merchant/merchant.selectors';

export const selectCanUseEmailValidation = createSelector<any, MerchantTags[], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseEmailValidation),
);

export const selectSenderEmails = createSelector<any, IMerchantSettings, ISenderEmail[]>(
  selectMerchantSettings,
  (settings) => settings?.senderEmails || [],
);
