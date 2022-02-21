import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { IpCheckMerit } from '../services/IpCheckMerit.service';

export const ipCheckInit = () => (): ProductTypes => {
  const ipCheck = new IpCheckMerit();
  productManagerService.register(ipCheck);
  return ipCheck.id;
};
