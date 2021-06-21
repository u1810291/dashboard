import { DocumentVerification } from 'apps/documentVerification/services/DocumentVerification.service';
import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';

export const documentVerificationInit = () => (): ProductTypes => {
  const documentVerification = new DocumentVerification();
  productManagerService.register(documentVerification);
  return documentVerification.id;
};
