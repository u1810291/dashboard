import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { DeviceFingerPrintService } from '../services/DeviceFingerPrint.service';

export const deviceFingerprintInit = () => (): ProductTypes => {
  const deviceFingerprint = new DeviceFingerPrintService();
  productManagerService.register(deviceFingerprint);
  return deviceFingerprint.id;
};
