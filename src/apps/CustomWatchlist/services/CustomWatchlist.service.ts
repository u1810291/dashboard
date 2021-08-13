import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiFlag } from 'react-icons/fi';
import { getCustomWatchlistStep, CustomWatchlistStep } from 'models/CustomWatchlist.model';
import { VerificationResponse } from 'models/Verification.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { CustomWatchlistVerification } from '../components/CustomWatchlistVerification/CustomWatchlistVerification';
import { CustomWatchlistSettings } from '../components/CustomWatchlistSettings/CustomWatchlistSettings';
import { CustomWatchlistCheckTypes, CustomWatchlistSettingsTypes } from '../models/CustomWatchlist.model';

type ProductSettingsCustomWatchlist = ProductSettings<CustomWatchlistSettingsTypes>;

export class CustomWatchlist extends ProductBaseService implements Product<ProductSettingsCustomWatchlist> {
  id = ProductTypes.CustomWatchlist;
  order = 600;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  icon = FiFlag;
  inputs = [
    ProductInputTypes.NationalId,
  ];
  requiredProductType = ProductTypes.DocumentVerification;
  checks = [{
    id: CustomWatchlistCheckTypes.CustomDatabases,
    isActive: true,
  }];
  component = CustomWatchlistSettings;
  componentVerification = CustomWatchlistVerification;

  parser(flow: IFlow): ProductSettingsCustomWatchlist {
    return {
      [CustomWatchlistSettingsTypes.str]: {
        value: 'str',
      },
    };
  }

  serialize(settings: ProductSettingsCustomWatchlist): Partial<IFlow> {
    return {
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return true;
  }

  getVerification(verification: VerificationResponse): CustomWatchlistStep {
    return getCustomWatchlistStep(verification?.steps);
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const customWatchlistStep = getCustomWatchlistStep(verification?.steps);
    if (!customWatchlistStep) {
      return false;
    }
    return getStepStatus(customWatchlistStep) === StepStatus.Failure;
  }
}
