import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { GovernmentCheckMerit } from '../services/GovermentCheckMerit.service';

export const govCheckInit = () => (): ProductTypes => {
  const govCheck = new GovernmentCheckMerit();
  productManagerService.register(govCheck);
  return govCheck.id;
};
