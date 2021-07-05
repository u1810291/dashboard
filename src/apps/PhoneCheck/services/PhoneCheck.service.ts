import { PhoneCheckCheckTypes, PhoneOwnershipValidationTypes, PhoneCheckSettingTypes } from 'apps/PhoneCheck/models/PhoneCheck.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductIntegrationTypes, ProductSettings, ProductTypes, ProductInputTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiPhone } from 'react-icons/fi';
import { VerificationResponse } from 'models/Verification.model';
import { PhoneCheckSettings } from '../components/PhoneCheckSettings/PhoneCheckSettings';
import { PhoneCheckVerification } from '../components/PhoneCheckVerification/PhoneCheckVerification';

type PhoneCheckProductSettings = ProductSettings<PhoneCheckSettingTypes>;

export class PhoneCheck extends ProductBaseService implements Product {
  id = ProductTypes.PhoneCheck;
  order = 1000;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
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
  component = PhoneCheckSettings;
  componentVerification = PhoneCheckVerification;

  parser(flow: IFlow): PhoneCheckProductSettings {
    return {
      [PhoneCheckSettingTypes.PhoneOwnershipValidation]: {
        value: flow?.verificationPatterns[VerificationPatternTypes.PhoneOwnershipValidation],
      },
      [PhoneCheckSettingTypes.CompanyName]: {
        value: flow?.phoneOwnership?.companyName,
      },
      [PhoneCheckSettingTypes.PhoneRiskValidation]: {
        value: flow?.verificationPatterns[VerificationPatternTypes.PhoneRiskValidation],
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
        [VerificationPatternTypes.PhoneOwnershipValidation]: settings[PhoneCheckSettingTypes.PhoneRiskValidation].value,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    super.onRemove();
    return {
      verificationPatterns: {
        [VerificationPatternTypes.PhoneOwnershipValidation]: PhoneOwnershipValidationTypes.None,
        [VerificationPatternTypes.PhoneRiskValidation]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns[VerificationPatternTypes.PhoneOwnershipValidation] !== PhoneOwnershipValidationTypes.None;
  }

  getVerification(verification: VerificationResponse): any {
    return verification;
  }
}
