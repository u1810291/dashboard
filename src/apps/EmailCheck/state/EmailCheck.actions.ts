import { EmailCheck } from 'apps/EmailCheck/services/EmailCheck.service';
import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';

export const EmailCheckInit = () => (): ProductTypes => {
  const emailCheck = new EmailCheck();
  productManagerService.register(emailCheck);
  return emailCheck.id;
};
