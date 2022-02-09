import React from 'react';
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
  CreditCheck = 'CreditCheck',
  DeviceFingerPrint = 'DeviceFingerPrint',
  PhoneCheck = 'PhoneCheck',
  EmailCheck = 'EmailCheck',
  CustomDocuments = 'CustomDocuments',
  CertifiedTimestamp = 'CertifiedTimestamp',
  BackgroundCheck = 'BackgroundCheck',
  CustomField = 'CustomField',
  CustomWatchlist = 'CustomWatchlist',
  ESignatureCheck = 'eSignatureCheck',
  BankAccountData = 'BankAccountData',
  WorkAccountData = 'WorkAccountData',
  PayrollAccountData = 'PayrollAccountData',
  Facematch = 'Facematch',
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
  CustomDataEntry = 'customDataEntry',
  CustomDocuments = 'customDocuments',
  Sign = 'sign',
  AccountCredentials = 'accountCredentials',
  ImageSources = 'imageSources',
}

export interface IProductCard {
  id: ProductTypes;
  icon: IconType | (() => React.ReactNode);
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
  onRemove(flow: IFlow): Partial<IFlow>;
  onAdd(): Partial<IFlow>;
  getRemovingAlertComponent?(flow: IFlow, productsInGraph?: ProductTypes[]): any;
  haveIssues?(flow: IFlow, productsInGraph?: ProductTypes[]): boolean;
  isSdkOnly?(): boolean;
  getIssuesComponent?(flow: IFlow, productsInGraph?: ProductTypes[]): any;
  getTitle(): string;
  getCard(): IProductCard;
  getVerification(verification: VerificationResponse): any;
  isInFlow(flow: IFlow): boolean;
  hasFailedCheck(verification: VerificationResponse): boolean;
  isInVerification(verification: VerificationResponse): boolean;
}
