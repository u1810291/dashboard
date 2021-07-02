import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';
import { BiometricVerification } from '../services/BiometricVerification.service';

export const biometricVerificationInit = () => (): ProductTypes => {
  const biometricVerification = new BiometricVerification();
  productManagerService.register(biometricVerification);
  return biometricVerification.id;
};
