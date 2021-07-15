import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { IFlow } from 'models/Flow.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { FiFlag } from 'react-icons/fi';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { CountrySpecificChecks, StepStatus } from 'models/Step.model';
import { GovCheckSettings } from '../components/GovCheckSettings/GovCheckSettings';
import { GovCheckStepTypes, GovernmentCheckSettingTypes, GovernmentChecksTypes, verificationPatternsCountries } from '../models/GovCheck.model';
import { GovCheckVerificationProduct } from '../components/GovCheckVerificationProduct/GovCheckVerificationProduct';

type ProductSettingsGovCheck = ProductSettings<GovernmentCheckSettingTypes>;

export class GovernmentCheck extends ProductBaseService implements Product<ProductSettingsGovCheck> {
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
  checks = [
    {
      id: GovernmentChecksTypes.GovernmentDatabaseCheck,
      isActive: true,
    },
  ];

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

  parser(flow: IFlow): ProductSettingsGovCheck {
    return {
      [GovernmentCheckSettingTypes.PostponedTimeout]: {
        value: flow?.postponedTimeout,
      },
      [GovernmentCheckSettingTypes.CountriesGovChecks]: {
        value: flow?.verificationPatterns,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.ArgentinianDni]: false,
        [VerificationPatternTypes.ArgentinianRenaper]: false,
        [VerificationPatternTypes.BolivianOep]: false,
        [VerificationPatternTypes.BrazilianCpf]: GovCheckStepTypes.None,
        [VerificationPatternTypes.EcuadorianRegistroCivil]: false,
        [VerificationPatternTypes.HonduranRnp]: false,
        [VerificationPatternTypes.ChileanRegistroCivil]: false,
        [VerificationPatternTypes.ColombianRegistraduria]: false,
        [VerificationPatternTypes.CostaRicanAtv]: false,
        [VerificationPatternTypes.CostaRicanTse]: false,
        [VerificationPatternTypes.CostaRicanSocialSecurity]: false,
        [VerificationPatternTypes.DominicanJce]: false,
        [VerificationPatternTypes.ParaguayanRcp]: false,
        [VerificationPatternTypes.MexicanCurp]: false,
        [VerificationPatternTypes.MexicanIne]: false,
        [VerificationPatternTypes.MexicanRfc]: false,
        [VerificationPatternTypes.PeruvianReniec]: false,
        [VerificationPatternTypes.SalvadorianTse]: false,
        [VerificationPatternTypes.PanamenianTribunalElectoral]: false,
        [VerificationPatternTypes.VenezuelanCne]: false,
      },
    };
  }

  serialize(settings: ProductSettingsGovCheck): Partial<IFlow> {
    return {
      postponedTimeout: settings[GovernmentCheckSettingTypes.PostponedTimeout]?.value,
      verificationPatterns: settings[GovernmentCheckSettingTypes.CountriesGovChecks]?.value,
    };
  }
}