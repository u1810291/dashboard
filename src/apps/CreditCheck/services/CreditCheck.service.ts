import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { FiCreditCard } from 'react-icons/fi';
import { CountrySpecificCreditChecks, StepStatus } from 'models/Step.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { DeepPartial } from 'lib/object';
import { CreditCheckSettings } from '../components/CreditCheckSettings/CreditCheckSettings';
import { CreditCheckSettingTypes, CreditChecksTypes, creditIsInVerification, verificationPatternsCreditChecksDefault } from '../models/CreditCheck.model';
import { CreditCheckVerificationProduct } from '../components/CreditCheckVerificationProduct/CreditCheckVerificationProduct';

type ProductSettingsCreditCheck = ProductSettings<CreditCheckSettingTypes>;

export class CreditCheck extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.CreditCheck;
  inputs = [
    ProductInputTypes.NationalId,
  ];
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  order = 1000;
  requiredProductType = ProductTypes.DocumentVerification;
  checks = [
    {
      id: CreditChecksTypes.CreditDatabaseCheck,
      isActive: true,
    },
  ];

  icon = FiCreditCard;

  component = CreditCheckSettings;
  componentVerification = CreditCheckVerificationProduct;

  getVerification(verification: VerificationResponse): any {
    return verification?.documents || [];
  }

  onAdd(): DeepPartial<IFlow> {
    return {};
  }

  isInFlow(flow: IFlow): boolean {
    const isCreditChecksEnabled = Object.entries(flow?.verificationPatterns).some(
      ([key, value]) => Object.prototype.hasOwnProperty.call(verificationPatternsCreditChecksDefault, key) && value,
    );
    return !!flow?.postponedTimeout || isCreditChecksEnabled;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return creditIsInVerification(verification);
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => {
      const steps = document?.steps || [];
      const creditChecksSteps = steps.filter((step) => CountrySpecificCreditChecks.includes(step.id));
      return creditChecksSteps.some((step) => step.checkStatus === StepStatus.Failure);
    });
  }

  parser(flow: IFlow): ProductSettingsCreditCheck {
    return {
      [CreditCheckSettingTypes.CountriesCreditChecks]: {
        value: flow?.verificationPatterns,
      },
    };
  }

  onRemove(): DeepPartial<IFlow> {
    return {
      verificationPatterns: verificationPatternsCreditChecksDefault,
    };
  }

  serialize(settings: ProductSettingsCreditCheck): DeepPartial<IFlow> {
    return {
      verificationPatterns: settings[CreditCheckSettingTypes.CountriesCreditChecks]?.value,
    };
  }
}
