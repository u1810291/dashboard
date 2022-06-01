import { createSelector } from 'reselect';
import { MerchantTags, ISenderEmail } from 'models/Merchant.model';
import { selectMerchantTags, selectMerchantSettings } from 'state/merchant/merchant.selectors';

export const selectCanUseEmailValidation = createSelector<[typeof selectMerchantTags], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseEmailValidation),
);

export const selectSenderEmails = createSelector<[typeof selectMerchantSettings], ISenderEmail[]>(
  selectMerchantSettings,
  (settings) => settings?.senderEmails || [],
);
