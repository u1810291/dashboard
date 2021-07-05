import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { InputTypes } from 'models/Input.model';
import { Product, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { FiSmartphone } from 'react-icons/fi';
import { DeviceFingerPrintSettings } from '../components/DeviceFingerPrintSettings/DeviceFingerPrintSettings';
import { DeviceFingerprintVerification } from '../components/DeviceFingerprintVerification/DeviceFingerPrintVerification';
import { DeviceFingerPrintCheckTypes, DeviceFingerPrintInputData } from '../models/DeviceFingerPrint.model';

export class DeviceFingerPrintService extends ProductBaseService implements Product {
  id = ProductTypes.DeviceFingerPrint;
  order = 1100;
  icon = FiSmartphone;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  checks = [
    {
      id: DeviceFingerPrintCheckTypes.OS,
      isActive: true,
    },
    {
      id: DeviceFingerPrintCheckTypes.Browser,
      isActive: true,
    },
    {
      id: DeviceFingerPrintCheckTypes.DeviceModelAndType,
      isActive: true,
    },
  ];

  component = DeviceFingerPrintSettings;
  componentVerification = DeviceFingerprintVerification;

  isInFlow(): boolean {
    return false;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return !!verification?.inputs?.find((input) => input?.id === InputTypes.ConnectionData);
  }

  serialize() {
    return null;
  }

  getVerification(verification: VerificationResponse): DeviceFingerPrintInputData {
    return verification?.inputs?.find((input) => input?.id === InputTypes.ConnectionData)?.data;
  }
}
