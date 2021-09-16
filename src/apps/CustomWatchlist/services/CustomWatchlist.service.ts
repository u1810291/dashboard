import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { FiFlag } from 'react-icons/fi';
import { VerificationResponse } from 'models/Verification.model';
import { CustomWatchlistCheckTypes, CustomWatchlistSettingsTypes } from 'models/CustomWatchlist.model';
import { CustomWatchlistVerification } from '../components/CustomWatchlistVerification/CustomWatchlistVerification';
import { CustomWatchlistSettings } from '../components/CustomWatchlistSettings/CustomWatchlistSettings';

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
    console.log('FLOW', flow);
    return {
      [CustomWatchlistSettingsTypes.Watchlists]: {
        value: flow[CustomWatchlistSettingsTypes.Watchlists],
      },
    };
  }

  serialize(settings: ProductSettingsCustomWatchlist): Partial<IFlow> {
    console.log('settings', settings);
    return {
      [CustomWatchlistSettingsTypes.Watchlists]: settings[CustomWatchlistSettingsTypes.Watchlists].value,
    };
  }

  onAdd(): Partial<IFlow> {
    return {};
  }

  isInFlow(flow: IFlow): boolean {
    return flow[CustomWatchlistSettingsTypes.Watchlists].length !== 0;
  }

  getVerification(verification: VerificationResponse): any {
    return verification;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return false;
  }
}
