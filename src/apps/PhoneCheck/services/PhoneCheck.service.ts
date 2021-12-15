import { getPhoneValidationStep, getPhoneRiskStep } from 'models/PhoneCheck.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductSettings, ProductTypes, ProductInputTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiPhone } from 'react-icons/fi';
import { VerificationResponse } from 'models/Verification.model';
import { MerchantTags } from 'models/Merchant.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { PhoneCheckCheckTypes, PhoneOwnershipValidationTypes, PhoneCheckSettingTypes } from '../models/PhoneCheck.model';
import { PhoneCheckSettings } from '../components/PhoneCheckSettings/PhoneCheckSettings';
import { PhoneCheckVerification, PhoneCheckVerificationData } from '../components/PhoneCheckVerification/PhoneCheckVerification';

type PhoneCheckProductSettings = ProductSettings<PhoneCheckSettingTypes>;

export class PhoneCheck extends ProductBaseService implements Product {
  constructor(merchantTags: MerchantTags[]) {
    super();
    this.merchantTags = merchantTags;
  }

  id = ProductTypes.PhoneCheck;
  order = 600;
  integrationTypes = [];
  icon = FiPhone;
  inputs = [
    ProductInputTypes.PhoneNumber,
  ];
  checks = [{
    id: PhoneCheckCheckTypes.PhoneValidation,
    isActive: true,
  }, {
    id: PhoneCheckCheckTypes.RiskAnalysis,
    isActive: true,
  }];
  merchantTags: MerchantTags[] = [];
  component = PhoneCheckSettings;
  componentVerification = PhoneCheckVerification;

  parser(flow: IFlow): PhoneCheckProductSettings {
    return {
      [PhoneCheckSettingTypes.PhoneOwnershipValidation]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.PhoneOwnershipValidation],
      },
      [PhoneCheckSettingTypes.CompanyName]: {
        value: flow?.phoneOwnership?.companyName,
      },
      [PhoneCheckSettingTypes.PhoneRiskValidation]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.PhoneRiskValidation],
      },
      [PhoneCheckSettingTypes.PhoneRiskThreshold]: {
        value: flow?.phoneRiskAnalysisThreshold,
      },
    };
  }

  serialize(settings: ProductSettings<PhoneCheckSettingTypes>): Partial<IFlow> {
    return {
      phoneOwnership: {
        [PhoneCheckSettingTypes.CompanyName]: settings[PhoneCheckSettingTypes.CompanyName].value,
      },
      phoneRiskAnalysisThreshold: settings[PhoneCheckSettingTypes.PhoneRiskThreshold].value,
      verificationPatterns: {
        [VerificationPatternTypes.PhoneOwnershipValidation]: settings[PhoneCheckSettingTypes.PhoneOwnershipValidation].value,
        [VerificationPatternTypes.PhoneRiskValidation]: settings[PhoneCheckSettingTypes.PhoneRiskValidation].value,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.PhoneOwnershipValidation]: PhoneOwnershipValidationTypes.None,
        [VerificationPatternTypes.PhoneRiskValidation]: false,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.PhoneOwnershipValidation]: this.merchantTags.includes(MerchantTags.CanUsePhoneValidation) ? PhoneOwnershipValidationTypes.Sms : PhoneOwnershipValidationTypes.None,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.PhoneOwnershipValidation] !== undefined
      && flow.verificationPatterns[VerificationPatternTypes.PhoneOwnershipValidation] !== PhoneOwnershipValidationTypes.None;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return (verification?.steps || []).filter((step) => [VerificationPatternTypes.PhoneOwnershipValidation, VerificationPatternTypes.PhoneRiskValidation].includes(step.id))
      .some((step) => getStepStatus(step) === StepStatus.Failure);
  }

  getVerification(verification: VerificationResponse): PhoneCheckVerificationData {
    return {
      phoneRiskStep: getPhoneRiskStep(verification?.steps),
      phoneValidationStep: getPhoneValidationStep(verification?.steps),
    };
  }
}
