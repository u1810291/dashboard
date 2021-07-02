import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { Metadata } from '../services/Metadata.service';

export const metadataInit = () => (): ProductTypes => {
  const metadata = new Metadata();
  productManagerService.register(metadata);
  return metadata.id;
};
