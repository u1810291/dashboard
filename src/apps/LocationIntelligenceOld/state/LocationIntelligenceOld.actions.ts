import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { LocationIntelligenceOld } from '../services/LocationIntelligenceOld.service';

export const LocationIntelligenceOldInit = () => (): ProductTypes => {
  const locationIntelligence = new LocationIntelligenceOld();
  productManagerService.register(locationIntelligence);
  return locationIntelligence.id;
};
