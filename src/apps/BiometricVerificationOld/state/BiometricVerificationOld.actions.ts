import { ProductTypes } from 'models/Product.model';
import { productManagerService } from 'apps/Product';
import { BiometricVerificationOld } from '../services/BiometricVerificationOld.service';

export const biometricVerificationOldInit = () => (): ProductTypes => {
  const biometricVerification = new BiometricVerificationOld();
  productManagerService.register(biometricVerification);
  return biometricVerification.id;
};
