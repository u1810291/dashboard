import { PhoneCheck } from 'apps/PhoneCheck/services/PhoneCheck.service';
import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';

export const PhoneCheckInit = () => (): ProductTypes => {
  const phoneCheck = new PhoneCheck();
  productManagerService.register(phoneCheck);
  return phoneCheck.id;
};
