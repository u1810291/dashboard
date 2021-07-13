import { EmailCheck } from 'apps/EmailCheck/services/EmailCheck.service';
import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export const EmailCheckInit = () => (_, getState): ProductTypes => {
  const emailCheck = new EmailCheck(selectMerchantTags(getState()));
  productManagerService.register(emailCheck);
  return emailCheck.id;
};
