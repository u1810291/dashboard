import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { IpCheckOld } from 'apps/IpCheckOld/services/IpCheck.service';

export const ipCheckOldInit = () => (): ProductTypes => {
  const ipCheck = new IpCheckOld();
  productManagerService.register(ipCheck);
  return ipCheck.id;
};
