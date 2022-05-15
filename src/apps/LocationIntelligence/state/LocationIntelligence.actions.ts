import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { LocationIntelligenceMerit } from '../services/LocationIntelligence.service';

export const LocationIntelligenceInit = () => (): ProductTypes => {
  const locationIntelligence = new LocationIntelligenceMerit();
  productManagerService.register(locationIntelligence);
  return locationIntelligence.id;
};
