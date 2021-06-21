import { IpCheck } from 'apps/ipCheck/services/IpCheck.service';
import { selectCanUseIpCheck } from 'apps/ipCheck/state/IpCheck.selector';
import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';

export const ipCheckInit = () => (dispatch, getState): ProductTypes => {
  const isCanUseIpCheck = selectCanUseIpCheck(getState());

  if (!isCanUseIpCheck) {
    return null;
  }

  const ipCheck = new IpCheck();
  productManagerService.register(ipCheck);
  return ipCheck.id;
};
