import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { AmlCheck } from '../services/Aml.service';

export const amlCheckInit = () => (): ProductTypes => {
  const amlCheck = new AmlCheck();
  productManagerService.register(amlCheck);
  return amlCheck.id;
};
