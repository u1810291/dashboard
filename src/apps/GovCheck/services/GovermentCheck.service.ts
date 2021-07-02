import { Product, ProductCheck, ProductConfig, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { IFlow } from 'models/Flow.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { FiFlag } from 'react-icons/fi';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { CountrySpecificChecks, StepStatus } from 'models/Step.model';
import { GovCheckSettings } from '../components/GovCheckSettings/GovCheckSettings';
import { GovCheckStepTypes, GovernmentCheckSettingTypes, GovernmentChecksTypes, verificationPatternsCountries } from '../models/GovCheck.model';
import { GovCheckVerificationProduct } from '../components/GovCheckVerificationProduct/GovCheckVerificationProduct';

export class GovernmentCheck extends ProductBaseService implements Product {
  id = ProductTypes.GovernmentCheck;
  inputs = [
    ProductInputTypes.NationalId,
  ];
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  order = 300;
  requiredProductType = ProductTypes.DocumentVerification;
  checksDefault = [{
    id: GovernmentChecksTypes.GovernmentDatabaseCheck,
    isActive: true,
  }];

  icon = FiFlag;

  component = GovCheckSettings;
  componentVerification = GovCheckVerificationProduct;

  getVerification(verification: VerificationResponse): any {
    return verification?.documents || [];
  }

  isInFlow(flow: IFlow): boolean {
    const isGovChecksEnabled = Object.entries(flow?.verificationPatterns).some(
      ([key, value]) => verificationPatternsCountries.includes(key as VerificationPatternTypes) && value && value !== GovCheckStepTypes.None,
    );
    return !!flow?.postponedTimeout || isGovChecksEnabled;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => {
      const govChecksSteps = document?.steps.filter((step) => CountrySpecificChecks.includes(step.id));
      return govChecksSteps?.length > 0;
    });
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => {
      const steps = document?.steps || [];
      const govChecksSteps = steps.filter((step) => CountrySpecificChecks.includes(step.id));
      return govChecksSteps.some((step) => step.checkStatus === StepStatus.Failure);
    });
  }

  getChecks(flow?: IFlow): ProductCheck[] {
    return flow ? [{
      id: GovernmentChecksTypes.GovernmentDatabaseCheck,
      isActive: !!flow?.postponedTimeout,
    }] : this.checksDefault;
  }

  parser(flow: IFlow): ProductConfig {
    super.parser(flow);
    return {
      settings: {
        [GovernmentCheckSettingTypes.PostponedTimeout]: {
          value: flow?.postponedTimeout,
        },
        [GovernmentCheckSettingTypes.CountriesGovChecks]: {
          value: flow?.verificationPatterns,
        },
      },
    };
  }

  serialize(settings: ProductSettings<GovernmentCheckSettingTypes>): Partial<IFlow> {
    return {
      postponedTimeout: settings[GovernmentCheckSettingTypes.PostponedTimeout]?.value,
      verificationPatterns: settings[GovernmentCheckSettingTypes.CountriesGovChecks]?.value,
    };
  }
}
