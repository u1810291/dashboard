import { AmlCheckTypes, AmlDocumentSteps, AmlSettingsTypes, AmlValidationTypes } from 'apps/Aml/models/Aml.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiDollarSign } from 'react-icons/fi';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { AmlSettings } from '../components/AmlSettings/AmlSettings';
import { AmlVerificationProduct } from '../components/AmlVerificationProduct/AmlVerificationProduct';

type ProductSettingsAml = ProductSettings<AmlSettingsTypes>;

export class AmlCheck extends ProductBaseService implements Product<ProductSettingsAml> {
  id = ProductTypes.AmlCheck;
  order = 400;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  icon = FiDollarSign;
  inputs = [
    ProductInputTypes.NameAndDobOrDocument,
  ];
  checks = [
    {
      id: AmlCheckTypes.Watchlist,
      isActive: true,
    },
    {
      id: AmlCheckTypes.Search,
      isActive: true,
    },
    {
      id: AmlCheckTypes.Monitoring,
      isActive: true,
    },
  ];
  requiredProductType = ProductTypes.DocumentVerification;
  component = AmlSettings;
  componentVerification = AmlVerificationProduct;

  parser(flow: IFlow): ProductSettingsAml {
    const pattern = flow?.verificationPatterns?.[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation];

    return {
      [AmlSettingsTypes.Search]: {
        value: pattern !== AmlValidationTypes.None,
      },
      [AmlSettingsTypes.Monitoring]: {
        value: pattern === AmlValidationTypes.SearchMonitoring,
      },
      [AmlSettingsTypes.AmlThreshold]: {
        value: flow?.amlWatchlistsFuzzinessThreshold ?? 50,
      },
    };
  }

  serialize(settings: ProductSettingsAml): Partial<IFlow> {
    let pattern = AmlValidationTypes.None;
    if (settings[AmlSettingsTypes.Search].value) {
      pattern = AmlValidationTypes.Search;
    }
    if (settings[AmlSettingsTypes.Monitoring].value) {
      pattern = AmlValidationTypes.SearchMonitoring;
    }

    return {
      verificationPatterns: {
        [VerificationPatternTypes.PremiumAmlWatchListsSearchValidation]: pattern,
      },
      amlWatchlistsFuzzinessThreshold: settings[AmlSettingsTypes.AmlThreshold].value,
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.PremiumAmlWatchListsSearchValidation]: AmlValidationTypes.Search,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.PremiumAmlWatchListsSearchValidation]: AmlValidationTypes.None,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation] !== undefined && flow.verificationPatterns[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation] !== AmlValidationTypes.None;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => document?.steps?.filter((step) => AmlDocumentSteps.includes(step?.id)).map((step) => getStepStatus(step)).includes(StepStatus.Failure));
  }

  getVerification(verification: VerificationResponse): any {
    return verification?.documents;
  }
}
