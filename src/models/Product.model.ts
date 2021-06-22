import { IFlow } from 'models/Flow.model';
import { IconType } from 'react-icons';

export enum ProductTypes {
  DocumentVerification = 'DocumentVerification',
  BiometricVerification = 'BiometricVerification',
  IpCheck = 'IpCheck',
}

export interface ProductSettingsProps<T> {
  product?: Product,
  settings: T;
  onUpdate: (settings: ProductSetting) => void,
}

export interface ProductSetting {
  value: any,
  isDisabled?: boolean,
  isRequireOtherProduct?: boolean,
  isCantBeUsedWithOtherSetting?: boolean,
}

export interface ProductCheck {
  isActive: boolean,
}

export interface ProductConfig<ES extends string = string, EC extends string = string> {
  settings: Record<ES, ProductSetting>,
  checks: Record<EC, ProductCheck>
}

export enum ProductIntegrationTypes {
  Sdk = 'SDK',
  Api = 'API',
}

export enum ProductInputTypes {
  Documents = 'documents',
  NoActiveInputs = 'noActiveInputs',
  PhoneNumber = 'phoneNumber',
}

export interface IProductCard {
  id: ProductTypes;
  icon: IconType;
  order: number;
  title: string;
  inputs: ProductInputTypes[];
  checks: string[];
  integrationTypes: ProductIntegrationTypes[];
}

export interface Product {
  id: ProductTypes;
  order: number;
  integrationTypes: ProductIntegrationTypes[];
  component: any;
  parser(flow: IFlow, productsInGraph?: any[]): ProductConfig;
  serialize(settings: ProductConfig): Partial<IFlow>;
  getNullishValues(): Partial<IFlow>;
  getTitle(): string;
  getCard(): IProductCard;
  isInGraph(flow: IFlow): boolean;
}
