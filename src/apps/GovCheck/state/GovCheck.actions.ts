import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { GovernmentCheck } from 'apps/GovCheckOld/services/GovermentCheck.service';

export const govCheckInit = () => (): ProductTypes => {
  const govCheck = new GovernmentCheck();
  productManagerService.register(govCheck);
  return govCheck.id;
};
