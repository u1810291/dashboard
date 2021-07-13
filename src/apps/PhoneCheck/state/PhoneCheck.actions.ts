import { PhoneCheck } from 'apps/PhoneCheck/services/PhoneCheck.service';
import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export const PhoneCheckInit = () => (_, getState): ProductTypes => {
  const phoneCheck = new PhoneCheck(selectMerchantTags(getState()));
  productManagerService.register(phoneCheck);
  return phoneCheck.id;
};
