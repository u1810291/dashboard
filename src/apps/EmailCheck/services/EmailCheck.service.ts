import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductSettings, ProductTypes, ProductInputTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiMail } from 'react-icons/fi';
import { VerificationResponse } from 'models/Verification.model';
import { MerchantTags } from 'models/Merchant.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { getEmailValidationStep, getEmailRiskStep } from 'models/EmailCheck.model';
import { EmailCheckCheckTypes, EmailCheckStepModes, EmailCheckSettingTypes, EmailCheckProductSettings } from '../models/EmailCheck.model';
import { EmailCheckVerification, EmailCheckVerificationData } from '../components/EmailCheckVerification/EmailCheckVerification';
import { EmailCheckSettings } from '../components/EmailCheckSettings/EmailCheckSettings';

export class EmailCheck extends ProductBaseService implements Product {
  constructor(merchantTags: MerchantTags[]) {
    super();
    this.merchantTags = merchantTags;
  }

  id = ProductTypes.EmailCheck;
  order = 700;
  integrationTypes = [];
  icon = FiMail;
  inputs = [
    ProductInputTypes.EmailAddress,
  ];
  checks = [{
    id: EmailCheckCheckTypes.EmailCheck,
    isActive: true,
  }, {
    id: EmailCheckCheckTypes.RiskCheck,
    isActive: true,
  }];
  merchantTags: MerchantTags[] = [];
  component = EmailCheckSettings;
  componentVerification = EmailCheckVerification;

  parser(flow: IFlow): EmailCheckProductSettings {
    return {
      [EmailCheckSettingTypes.CompanyName]: {
        value: flow?.emailOwnership?.companyName,
      },
      [EmailCheckSettingTypes.EmailFrom]: {
        value: flow?.emailOwnership?.emailFrom ?? '',
      },
      [EmailCheckSettingTypes.EmailRiskThreshold]: {
        value: flow?.emailRiskThreshold,
      },
      [EmailCheckSettingTypes.EmailOwnershipValidation]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.EmailOwnershipValidation],
      },
      [EmailCheckSettingTypes.EmailRiskValidation]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.EmailRiskValidation],
      },
    };
  }

  serialize(settings: ProductSettings<EmailCheckSettingTypes>): Partial<IFlow> {
    return {
      emailOwnership: {
        [EmailCheckSettingTypes.CompanyName]: settings[EmailCheckSettingTypes.CompanyName].value,
        [EmailCheckSettingTypes.EmailFrom]: settings[EmailCheckSettingTypes.EmailFrom].value,
      },
      emailRiskThreshold: settings[EmailCheckSettingTypes.EmailRiskThreshold].value,
      verificationPatterns: {
        [VerificationPatternTypes.EmailOwnershipValidation]: settings[EmailCheckSettingTypes.EmailOwnershipValidation].value,
        [VerificationPatternTypes.EmailRiskValidation]: settings[EmailCheckSettingTypes.EmailRiskValidation].value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.EmailOwnershipValidation]: this.merchantTags.includes(MerchantTags.CanUseEmailValidation) ? EmailCheckStepModes.Forced : EmailCheckStepModes.None,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.EmailOwnershipValidation]: EmailCheckStepModes.None,
        [VerificationPatternTypes.EmailRiskValidation]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.EmailOwnershipValidation] !== undefined
      && flow.verificationPatterns[VerificationPatternTypes.EmailOwnershipValidation] !== EmailCheckStepModes.None;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return (verification?.steps || []).filter((step) => [VerificationPatternTypes.EmailOwnershipValidation, VerificationPatternTypes.EmailRiskValidation].includes(step.id))
      .some((step) => getStepStatus(step) === StepStatus.Failure);
  }

  getVerification(verification: VerificationResponse): EmailCheckVerificationData {
    return {
      emailRiskStep: getEmailRiskStep(verification?.steps),
      emailValidationStep: getEmailValidationStep(verification?.steps),
    };
  }
}
