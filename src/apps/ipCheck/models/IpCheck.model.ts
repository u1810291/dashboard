import { ProductConfig } from 'models/Product.model';

export enum IpCheckSettingsTypes {
  VpnAndProxyCheck = 'vpnAndProxyCheck',
}

export enum IpCheckCheckTypes {
  VpnAndProxyCheck = 'vpnAndProxyCheck',
}

export type IpCheckConfig = ProductConfig<IpCheckSettingsTypes, IpCheckCheckTypes>;
