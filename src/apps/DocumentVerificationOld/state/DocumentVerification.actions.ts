import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { DocumentVerificationOld } from '../services/DocumentVerificationOld.service';

export const documentVerificationOldInit = () => (): ProductTypes => {
  const documentVerification = new DocumentVerificationOld();
  productManagerService.register(documentVerification);
  return documentVerification.id;
};
