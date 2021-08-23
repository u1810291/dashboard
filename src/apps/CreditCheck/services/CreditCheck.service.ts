import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { IFlow } from 'models/Flow.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { FiCreditCard } from 'react-icons/fi';
import { CountrySpecificCreditChecks, StepStatus } from 'models/Step.model';
import { CreditCheckSettings } from '../components/CreditCheckSettings/CreditCheckSettings';
import { CreditCheckSettingTypes, CreditChecksTypes, verificationPatternsCreditChecksDefault } from '../models/CreditCheck.model';
import { CreditCheckVerificationProduct } from '../components/CreditCheckVerificationProduct/CreditCheckVerificationProduct';

type ProductSettingsCreditCheck = ProductSettings<CreditCheckSettingTypes>;

export class CreditCheck extends ProductBaseService implements Product<ProductSettingsCreditCheck> {
  id = ProductTypes.CreditCheck;
  inputs = [
    ProductInputTypes.NationalId,
  ];
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  order = 300;
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

  onAdd(): Partial<IFlow> {
    return {};
  }

  isInFlow(flow: IFlow): boolean {
    const isCreditChecksEnabled = Object.entries(flow?.verificationPatterns).some(
      ([key, value]) => Object.prototype.hasOwnProperty.call(verificationPatternsCreditChecksDefault, key) && value,
    );
    return !!flow?.postponedTimeout || isCreditChecksEnabled;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => {
      const creditChecksSteps = document?.steps.filter((step) => CountrySpecificCreditChecks.includes(step.id));
      return creditChecksSteps?.length > 0;
    });
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

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: verificationPatternsCreditChecksDefault,
    };
  }

  serialize(settings: ProductSettingsCreditCheck): Partial<IFlow> {
    return {
      verificationPatterns: settings[CreditCheckSettingTypes.CountriesCreditChecks]?.value,
    };
  }
}
