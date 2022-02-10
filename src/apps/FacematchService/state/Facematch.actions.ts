import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { Facematch } from '../services/Facematch.service';

export const FacematchInit = () => (): ProductTypes => {
  const facematchCheck = new Facematch();
  productManagerService.register(facematchCheck);
  return facematchCheck.id;
};
