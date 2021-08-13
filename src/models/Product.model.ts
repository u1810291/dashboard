import { IFlow } from 'models/Flow.model';
import { IconType } from 'react-icons';
import { VerificationResponse } from './Verification.model';

export enum ProductTypes {
  DocumentVerification = 'DocumentVerification',
  BiometricVerification = 'BiometricVerification',
  AmlCheck = 'AmlCheck',
  IpCheck = 'IpCheck',
  ReVerification = 'ReVerification',
  GovernmentCheck = 'GovernmentCheck',
  DeviceFingerPrint = 'DeviceFingerPrint',
  PhoneCheck = 'PhoneCheck',
  EmailCheck = 'EmailCheck',
  CertifiedTimestamp = 'CertifiedTimestamp',
  CustomWatchlist = 'CustomWatchlist',
  // additional
  Metadata = 'Metadata',
}

export interface ProductSetting {
  value: any;
  isDisabled?: boolean;
  isRequireOtherProduct?: boolean;
  isCantBeUsedWithOtherSetting?: boolean;
}

export interface ProductCheck<T extends string = string> {
  isActive: boolean;
  id: T;
}

export type ProductSettings<K extends string = string> = Record<K, ProductSetting>;

export interface ProductConfig {
  settings: ProductSettings;
}

export interface ProductSettingsProps<ES extends string = string> {
  settings: ProductSettings<ES>;
  onUpdate: (settings: ProductSettings<ES>) => void;
}

export enum ProductIntegrationTypes {
  Sdk = 'sdk',
  Api = 'api',
}

export enum ProductInputTypes {
  Documents = 'documents',
  NoActiveInputs = 'noActiveInputs',
  PhoneNumber = 'phoneNumber',
  Selfie = 'selfie',
  Liveness = 'liveness',
  NationalId = 'nationalId',
  NameAndDobOrDocument = 'nameAndDobOrDocument',
  EmailAddress = 'emailAddress',
}

export interface IProductCard {
  id: ProductTypes;
  icon: IconType;
  order: number;
  title: string;
  inputs: ProductInputTypes[];
  checks: ProductCheck[];
  integrationTypes: ProductIntegrationTypes[];
  requiredProductType?: ProductTypes;
  dependentProductTypes?: ProductTypes[];
}

export interface Product<T = ProductSettings> {
  id: ProductTypes;
  order: number;
  checks: ProductCheck[];
  integrationTypes: ProductIntegrationTypes[];
  component: any;
  componentVerification: any;
  isConfigurable: boolean;
  isIssuesIgnored: boolean;
  parser(flow: IFlow, productsInGraph?: ProductTypes[]): T;
  serialize(settings: T): Partial<IFlow>;
  onRemove(): Partial<IFlow>;
  onAdd(): Partial<IFlow>;
  getRemovingAlertComponent?(flow: IFlow): any;
  haveIssues?(flow: IFlow): boolean;
  isSdkOnly?(): boolean;
  getIssuesComponent?(flow: IFlow): any;
  getTitle(): string;
  getCard(): IProductCard;
  getVerification(verification: VerificationResponse): any;
  isInFlow(flow: IFlow): boolean;
  hasFailedCheck(verification: VerificationResponse): boolean;
  isInVerification(verification: VerificationResponse): boolean;
}
