import { AmlCheckTypes, AmlDocumentSteps, AmlSettingsTypes, AmlValidationTypes } from 'apps/Aml/models/Aml.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductCheck, ProductConfig, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiDollarSign } from 'react-icons/fi';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { AmlSettings } from '../components/AmlSettings/AmlSettings';
import { AmlVerificationProduct } from '../components/AmlVerificationProduct/AmlVerificationProduct';

export class AmlCheck extends ProductBaseService implements Product {
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
  checksDefault = [
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

  getChecks(flow: IFlow): ProductCheck[] {
    const pattern = flow?.verificationPatterns[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation];
    return flow
      ? [
        {
          id: AmlCheckTypes.Watchlist,
          isActive: pattern !== AmlValidationTypes.None,
        },
        {
          id: AmlCheckTypes.Search,
          isActive: pattern !== AmlValidationTypes.None,
        },
        {
          id: AmlCheckTypes.Monitoring,
          isActive: pattern === AmlValidationTypes.SearchMonitoring,
        },
      ]
      : this.checksDefault;
  }

  parser(flow: IFlow): ProductConfig {
    super.parser(flow);

    const pattern = flow?.verificationPatterns[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation];

    return {
      settings: {
        [AmlSettingsTypes.Search]: {
          value: pattern !== AmlValidationTypes.None,
        },
        [AmlSettingsTypes.Monitoring]: {
          value: pattern === AmlValidationTypes.SearchMonitoring,
        },
      },
    };
  }

  serialize(settings: ProductSettings<AmlSettingsTypes>): Partial<IFlow> {
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
    super.onRemove();
    return {
      verificationPatterns: {
        [VerificationPatternTypes.PremiumAmlWatchListsSearchValidation]: AmlValidationTypes.None,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation] !== AmlValidationTypes.None;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => document?.steps?.filter((step) => AmlDocumentSteps.includes(step)).map((step) => getStepStatus(step)).includes(StepStatus.Failure));
  }

  getVerification(verification: VerificationResponse): any {
    return verification?.documents;
  }
}
