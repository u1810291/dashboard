import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { CertifiedTimestamp } from '../services/CertifiedTimestamp.service';

export const certifiedTimestampInit = () => (): ProductTypes => {
  const certifiedTimestamp = new CertifiedTimestamp();
  productManagerService.register(certifiedTimestamp);
  return certifiedTimestamp.id;
};
