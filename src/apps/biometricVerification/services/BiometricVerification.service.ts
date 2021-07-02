import { BiometricVerificationRemovingAlert } from 'apps/biometricVerification/components/BiometricVerificationRemovingAlert';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { Product, ProductCheck, ProductConfig, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiUserCheck } from 'react-icons/fi';
import { IFlow } from 'models/Flow.model';
import { BiometricVerificationSettings } from 'apps/biometricVerification/components/BiometricVerificationSettings';
import { BiometricSteps, BiometricTypes } from 'models/Biometric.model';
import { BiometricVerificationCheckTypes, BiometricVerificationSettingsTypes } from 'apps/biometricVerification/models/BiometricVerification.model';
import { BiometricsVerificationProduct } from 'apps/biometrics';
import { VerificationResponse } from 'models/Verification.model';
import { getStepStatus, StepStatus } from 'models/Step.model';

export class BiometricVerification extends ProductBaseService implements Product {
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

  onRemove(): Partial<IFlow> {
    super.onRemove();
    return {
      facematchThreshold: undefined,
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.none,
        [VerificationPatternTypes.ProofOfOwnership]: false,
      },
    };
  }

  getRemovingAlertComponent(flow: IFlow): any {
    if (!flow?.verificationPatterns[VerificationPatternTypes.ProofOfOwnership] && !flow?.facematchThreshold) {
      return null;
    }
    return BiometricVerificationRemovingAlert;
  }

  getChecks(flow?: IFlow): ProductCheck[] {
    return flow
      ? [{
        id: BiometricVerificationCheckTypes.Liveness,
        isActive: flow?.verificationPatterns?.biometrics === BiometricTypes.liveness || flow?.verificationPatterns?.biometrics === BiometricTypes.voiceLiveness,
      }, {
        id: BiometricVerificationCheckTypes.VoiceLiveness,
        isActive: flow?.verificationPatterns?.biometrics === BiometricTypes.voiceLiveness,
      }]
      : this.checksDefault;
  }

  parser(flow: IFlow): ProductConfig {
    super.parser(flow);
    return {
      settings: {
        [BiometricVerificationSettingsTypes.Biometrics]: {
          value: flow?.verificationPatterns?.biometrics,
          isCantBeUsedWithOtherSetting: !!flow?.verificationPatterns[VerificationPatternTypes.ProofOfOwnership],
        },
      },
    };
  }

  serialize(settings: ProductSettings<BiometricVerificationSettingsTypes>): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: settings[BiometricVerificationSettingsTypes.Biometrics].value,
      },
    };
  }

  getVerification(verification: VerificationResponse): any {
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
