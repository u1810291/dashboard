import { AmlCheckTypes, AmlDocumentSteps, AmlSettingsTypes, AmlValidationTypes } from 'apps/Aml/models/Aml.model';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiDollarSign } from 'react-icons/fi';
import { getStepStatus, StepStatus, VerificationStepTypes } from 'models/Step.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { AmlSettings } from '../components/AmlSettings/AmlSettings';
import { AmlVerificationProduct } from '../components/AmlVerificationProduct/AmlVerificationProduct';

type ProductSettingsAml = ProductSettings<AmlSettingsTypes>;

export class AmlCheck extends ProductBaseFlowBuilder implements Product {
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
      [AmlSettingsTypes.BasicWatchlistsPattern]: {
        value: flow?.verificationPatterns[VerificationPatternTypes.BasicWatchlistsValidation],
      },
      [AmlSettingsTypes.AmlThreshold]: {
        value: flow?.amlWatchlistsFuzzinessThreshold ?? 50,
      },
      [AmlSettingsTypes.BasicWatchlists]: {
        value: flow?.basicWatchlists,
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
        [VerificationPatternTypes.BasicWatchlistsValidation]: settings[AmlSettingsTypes.BasicWatchlistsPattern].value,
      },
      amlWatchlistsFuzzinessThreshold: settings[AmlSettingsTypes.AmlThreshold].value,
      [AmlSettingsTypes.BasicWatchlists]: settings[AmlSettingsTypes.BasicWatchlists].value,
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
        [VerificationPatternTypes.BasicWatchlistsValidation]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation] !== undefined && flow.verificationPatterns[VerificationPatternTypes.PremiumAmlWatchListsSearchValidation] !== AmlValidationTypes.None;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const isAmlFailed = verification?.documents?.some((document) => document?.steps?.filter((step) => AmlDocumentSteps.includes(step?.id)).map((step) => getStepStatus(step)).includes(StepStatus.Failure));
    const isBasicWatchlistsFailed = verification.steps?.filter((step) => step.id === VerificationPatternTypes.BasicWatchlistsValidation).map((step) => getStepStatus(step)).includes(StepStatus.Failure);

    return isAmlFailed || isBasicWatchlistsFailed;
  }

  getVerification(verification: VerificationResponse): VerificationResponse {
    return verification;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return !!verification.steps.find((dataStep) => dataStep.id === VerificationStepTypes.BasicWatchlistsValidation) || !!verification?.documents;
  }
}
