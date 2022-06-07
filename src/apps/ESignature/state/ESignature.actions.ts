import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { ESignatureService } from '../services/ESignature.service';

export const eSignatureInit = () => (): ProductTypes => {
  const eSignature = new ESignatureService();
  productManagerService.register(eSignature);
  return eSignature.id;
};
