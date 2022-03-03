import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiUserCheck } from 'react-icons/fi';
import { IFlow } from 'models/Flow.model';
import { BiometricSteps, BiometricTypes } from 'models/Biometric.model';
import { BiometricsVerificationProduct } from 'apps/biometrics';
import { VerificationResponse } from 'models/VerificationOld.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { IESignatureFlow } from 'models/ESignature.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { BiometricVerificationSettings, BiometricVerificationRemovingAlert, BiometricVerificationCheckTypes, BiometricVerificationSettingsTypes } from 'apps/biometricVerification';

type ProductSettingsBiometric = ProductSettings<BiometricVerificationSettingsTypes>;

export class BiometricVerificationOld extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.BiometricVerification;
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

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.Biometrics] !== BiometricTypes.none && !flow?.verificationPatterns?.[VerificationPatternTypes.ReFacematch];
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.liveness,
      },
    };
  }

  onRemove(flow: IFlow): Partial<IFlow> {
    let electronicSignature: IESignatureFlow = flow?.electronicSignature;
    if (flow?.electronicSignature?.acceptanceCriteria.isFaceMatchRequired) {
      electronicSignature = {
        ...flow.electronicSignature,
        acceptanceCriteria: {
          ...flow.electronicSignature.acceptanceCriteria,
          isDocumentsRequired: false,
          isFaceMatchRequired: false,
        },
      };
    }
    return {
      facematchThreshold: undefined,
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.none,
        [VerificationPatternTypes.ProofOfOwnership]: false,
      },
      electronicSignature,
    };
  }

  getRemovingAlertComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    return productsInGraph.includes(ProductTypes.DocumentVerification) ? BiometricVerificationRemovingAlert : null;
  }

  parser(flow: IFlow): ProductSettingsBiometric {
    return {
      [BiometricVerificationSettingsTypes.Biometrics]: {
        value: flow?.verificationPatterns?.biometrics,
        isCantBeUsedWithOtherSetting: !!flow?.verificationPatterns?.[VerificationPatternTypes.ProofOfOwnership],
      },
    };
  }

  serialize(settings: ProductSettingsBiometric): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: settings[BiometricVerificationSettingsTypes.Biometrics].value,
      },
    };
  }

  getVerification(verification: VerificationResponse): VerificationResponse {
    return verification;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const steps = verification?.steps || [];
    const biometric = steps.filter((item) => BiometricSteps.includes(item?.id));
    if (biometric.length === 0) {
      return false;
    }
    return biometric.some((step) => getStepStatus(step) === StepStatus.Failure);
  }
}
