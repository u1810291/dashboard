import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiUserCheck } from 'react-icons/fi';
import { IFlow } from 'models/Flow.model';
import { BiometricSteps, BiometricTypes, IDuplicateSelfieStepData, SelfieStepTypes } from 'models/Biometric.model';
import { BiometricsVerificationProduct } from 'apps/biometrics';
import { VerificationResponse } from 'models/VerificationOld.model';
import { getStepStatus, IStep, StepStatus } from 'models/Step.model';
import { IESignatureFlow } from 'models/ESignature.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { BiometricVerificationSettings, BiometricVerificationRemovingAlert, BiometricVerificationCheckTypes, BiometricVerificationSettingsTypes, hasDuplicateFaceDetectionThresholdError, DEFAULT_DUPLICATE_FACE_DETECTION_THRESHOLD } from 'apps/biometricVerification';
import { GovCheckStepTypes } from 'apps/GovCheck';

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
      [BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold]: DEFAULT_DUPLICATE_FACE_DETECTION_THRESHOLD,
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.liveness,
        [VerificationPatternTypes.DuplicateFaceDetection]: false,
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
      [BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold]: undefined,
      verificationPatterns: {
        [VerificationPatternTypes.Biometrics]: BiometricTypes.none,
        [VerificationPatternTypes.ProofOfOwnership]: false,
        [VerificationPatternTypes.ArgentinianRenaperFacematch]: false,
        [VerificationPatternTypes.BrazilianCpf]: GovCheckStepTypes.None,
        [VerificationPatternTypes.IndonesianKPTValidation]: GovCheckStepTypes.None,
        [VerificationPatternTypes.DuplicateFaceDetection]: false,
      },
      electronicSignature,
    };
  }

  getRemovingAlertComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    return productsInGraph.includes(ProductTypes.DocumentVerification) ? BiometricVerificationRemovingAlert : null;
  }

  parser(flow: IFlow): ProductSettingsBiometric {
    return {
      [BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold]: {
        value: flow?.[BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold],
      },
      [BiometricVerificationSettingsTypes.DuplicateFaceDetection]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.DuplicateFaceDetection],
      },
      [BiometricVerificationSettingsTypes.Biometrics]: {
        value: flow?.verificationPatterns?.biometrics,
        isCantBeUsedWithOtherSetting: !!flow?.verificationPatterns?.[VerificationPatternTypes.ProofOfOwnership],
      },
    };
  }

  serialize(settings: ProductSettingsBiometric): Partial<IFlow> {
    return {
      [BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold]: settings[BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold].value,
      verificationPatterns: {
        [VerificationPatternTypes.DuplicateFaceDetection]: settings[BiometricVerificationSettingsTypes.DuplicateFaceDetection].value,
        [VerificationPatternTypes.Biometrics]: settings[BiometricVerificationSettingsTypes.Biometrics].value,
      },
    };
  }

  getVerification(verification: VerificationResponse): VerificationResponse {
    return verification;
  }

  haveIssues(flow: IFlow): boolean {
    return hasDuplicateFaceDetectionThresholdError(flow[BiometricVerificationSettingsTypes.DuplicateFaceDetectionThreshold]);
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const steps = verification?.steps || [];
    const biometric = steps.filter((item) => BiometricSteps.includes(item?.id));
    const duplicateFaceDetectionStep: IStep<IDuplicateSelfieStepData> = steps.find((step) => step.id === SelfieStepTypes.DuplicateSelfieValidation);
    if (biometric.length === 0) {
      return false;
    }
    return biometric.some((step) => getStepStatus(step) === StepStatus.Failure) || getStepStatus(duplicateFaceDetectionStep) === StepStatus.Failure;
  }
}
