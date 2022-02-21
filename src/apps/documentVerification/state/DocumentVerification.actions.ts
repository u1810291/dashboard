import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { DocumentVerificationMerit } from '../services/DocumentVerification.service';

export const documentVerificationInit = () => (): ProductTypes => {
  const documentVerification = new DocumentVerificationMerit();
  productManagerService.register(documentVerification);
  return documentVerification.id;
};
