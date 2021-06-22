import { IpCheckSettings } from 'apps/ipCheck/components/IpCheckSettings/IpCheckSettings';
import { IpCheckCheckTypes, IpCheckConfig, IpCheckSettingsTypes } from 'apps/ipCheck/models/IpCheck.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { FiActivity } from 'react-icons/fi';

export class IpCheck extends ProductBaseService implements Product {
  id = ProductTypes.IpCheck;
  order = 10;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  icon = FiActivity;
  inputs = [ProductInputTypes.NoActiveInputs];
  checks = [
    'IpCheck.card.check.vpn',
    'IpCheck.card.check.geo',
    'IpCheck.card.check.riskyIP',
  ];
  component = IpCheckSettings;

  parser(flow: IFlow): IpCheckConfig {
    return {
      settings: {
        [IpCheckSettingsTypes.VpnAndProxyCheck]: {
          value: flow?.verificationPatterns['ip-validation'],
        },
      },
      checks: {
        [IpCheckCheckTypes.VpnAndProxyCheck]: {
          isActive: flow?.verificationPatterns['ip-validation'] === true,
        },
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  serialize(setting: IpCheckConfig): Partial<IFlow> {
    return {
      verificationPatterns: {
        'ip-validation': setting.settings.vpnAndProxyCheck.value,
      },
    };
  }

  getNullishValues(): Partial<IFlow> {
    return {
      verificationPatterns: {
        'ip-validation': false,
      },
    };
  }

  isInGraph(flow: IFlow): boolean {
    return flow?.verificationPatterns['ip-validation'] === true;
  }
}
