import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductTypes, ProductIntegrationTypes, ProductSettings } from 'models/Product.model';
import { FiKey } from 'react-icons/fi';
import { BiometricVerificationCheckTypes } from 'apps/biometricVerification/models/BiometricVerification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { BiometricTypes } from 'models/Biometric.model';
import { getReVerificationStep } from 'models/ReVerification.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { DeepPartial } from 'lib/object';
import { ReVerificationVerification } from '../components/ReVerificationVerification/ReVerificationVerification';
import { ReVerificationSettings } from '../components/ReVerificationSettings/ReVerificationSettings';
import { ReVerificationSettingTypes, IReverificationVerification } from '../models/ReVerification.model';
import { ReverificationIssues } from '../components/ReverificationIssues/ReverificationIssues';

type ProductSettingsReVerification = ProductSettings<ReVerificationSettingTypes>;

export class ReVerification extends ProductBaseFlowBuilder implements Product {
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
        value: flow.verificationPatterns?.[VerificationPatternTypes.Biometrics],
      },
      [ReVerificationSettingTypes.ReFacematchThreshold]: {
        value: flow.reFacematchThreshold,
      },
      [ReVerificationSettingTypes.ProofOfOwnership]: {
        value: flow.verificationPatterns?.[VerificationPatternTypes.ProofOfOwnership],
      },
    };
  }

  serialize(settings: ProductSettingsReVerification): DeepPartial<IFlow> {
    return {
      reFacematchThreshold: settings[ReVerificationSettingTypes.ReFacematchThreshold].value,
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: settings[ReVerificationSettingTypes.Biometrics].value,
        [VerificationPatternTypes.ProofOfOwnership]: settings[ReVerificationSettingTypes.ProofOfOwnership].value,
      },
    };
  }

  onAdd(): DeepPartial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.liveness,
        [VerificationPatternTypes.ReFacematch]: true,
      },
    };
  }

  onRemove(): DeepPartial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.none,
        [VerificationPatternTypes.ReFacematch]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.ReFacematch];
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
