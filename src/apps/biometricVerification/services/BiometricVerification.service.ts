import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { FiUserCheck } from 'react-icons/fi';
import { BiometricsVerificationProduct } from 'apps/biometrics';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { IWorkflow } from 'models/Workflow.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import { BiometricVerificationCheckTypes, BiometricVerificationId, BiometricVerificationSettingsTypes } from '../models/BiometricVerification.model';
import { BiometricVerificationSettings } from '../components/BiometricVerificationSettings';

type ProductSettingsBiometric = ProductSettings<BiometricVerificationSettingsTypes>;

export class BiometricVerification extends ProductBaseWorkflow implements Product<IWorkflow, IVerificationWorkflow> {
  id = ProductTypes.BiometricVerification;
  meritId = BiometricVerificationId;
  order = 200;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  icon = FiUserCheck;
  inputs = [
    ProductInputTypes.Selfie,
    ProductInputTypes.Liveness,
  ];
  checks = [
    {
      id: BiometricVerificationCheckTypes.Liveness,
      isActive: true,
    },
    {
      id: BiometricVerificationCheckTypes.VoiceLiveness,
      isActive: true,
    },
  ];
  component = BiometricVerificationSettings;
  componentVerification = BiometricsVerificationProduct;
  requiredProductType = null;
  componentPdf = null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInFlow(workflow: IWorkflow): boolean {
    return false;
  }

  onAdd(): Partial<IWorkflow> {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemove(flow: IWorkflow): Partial<IWorkflow> {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parser(workflow: IWorkflow): ProductSettingsBiometric {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serialize(settings: ProductSettingsBiometric): Partial<IWorkflow> {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInVerification(verification: IVerificationWorkflow): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getVerification(verification: IVerificationWorkflow): any {
    return null;
  }
}
