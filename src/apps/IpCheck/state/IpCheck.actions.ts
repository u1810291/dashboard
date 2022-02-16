import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { IpCheck } from '../services/IpCheck.service';

export const ipCheckInit = () => (): ProductTypes => {
  const ipCheck = new IpCheck();
  productManagerService.register(ipCheck);
  return ipCheck.id;
};
