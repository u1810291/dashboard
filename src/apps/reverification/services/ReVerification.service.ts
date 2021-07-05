import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductTypes, ProductIntegrationTypes, ProductSettings } from 'models/Product.model';
import { FiKey } from 'react-icons/fi';
import { BiometricVerificationCheckTypes } from 'apps/biometricVerification/models/BiometricVerification.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/Verification.model';
import { BiometricTypes } from 'models/Biometric.model';
import { getReVerificationStep } from 'models/ReVerification.model';
import { ReVerificationVerification } from '../components/ReVerificationVerification/ReVerificationVerification';
import { ReVerificationSettings } from '../components/ReVerificationSettings/ReVerificationSettings';
import { ReVerificationSettingTypes, IReverificationVerification } from '../models/ReVerification.model';
import { ReverificationIssues } from '../components/ReverificationIssues/ReverificationIssues';

type ProductSettingsReVerification = ProductSettings<ReVerificationSettingTypes>;

export class ReVerification extends ProductBaseService implements Product<ProductSettingsReVerification> {
  id = ProductTypes.ReVerification;
  order = 500;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  icon = FiKey;
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
  isIssuesIgnored = true;
  component = ReVerificationSettings;
  componentVerification = ReVerificationVerification;

  parser(flow: IFlow): ProductSettingsReVerification {
    return {
      [ReVerificationSettingTypes.Biometrics]: {
        value: flow.verificationPatterns[VerificationPatternTypes.Biometrics],
      },
      [ReVerificationSettingTypes.FacematchThreshold]: {
        value: flow.facematchThreshold,
      },
      [ReVerificationSettingTypes.ProofOfOwnership]: {
        value: flow.verificationPatterns[VerificationPatternTypes.ProofOfOwnership],
      },
    };
  }

  serialize(settings: ProductSettingsReVerification): Partial<IFlow> {
    return {
      facematchThreshold: settings[ReVerificationSettingTypes.FacematchThreshold].value,
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: settings[ReVerificationSettingTypes.Biometrics].value,
        [VerificationPatternTypes.ProofOfOwnership]: settings[ReVerificationSettingTypes.ProofOfOwnership].value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.liveness,
        [VerificationPatternTypes.ReFacematch]: true,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.none,
        [VerificationPatternTypes.ReFacematch]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns[VerificationPatternTypes.ReFacematch];
  }

  getVerification(verification: VerificationResponse): IReverificationVerification {
    const reVerification = getReVerificationStep(verification);

    return {
      reVerification,
      identity: verification.identity,
    };
  }

  getIssuesComponent(): any {
    return ReverificationIssues;
  }
}
