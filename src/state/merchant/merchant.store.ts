import { IFlow } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';

export const MERCHANT_STORE_KEY = 'merchant';

export const MerchantActionGroups = {
  Merchant: 'MERCHANT',
  Configuration: 'CONFIGURATION',
  App: 'APP',
  CustomDocuments: 'CUSTOM_DOCUMENTS',
  Flows: 'FLOWS',
  BusinessName: 'BUSINESS_NAME',
  OnboardingSteps: 'ONBOARDING_STEPS',
};

export enum SliceNameTypes {
  Merchant = 'merchant',
  Configuration = 'configurations',
  App = 'app',
  CustomDocuments = 'customDocuments',
  Flows = 'flows',
}

export interface MerchantConfigurationDashboard {
  language: string;
}

export interface MerchantConfiguration {
  dashboard: MerchantConfigurationDashboard;
}

export interface MerchantApp {
  clientId: string;
  clientSecret: string;
}

export interface MerchantStore {
  [SliceNameTypes.Merchant]: Loadable<any>;
  [SliceNameTypes.Configuration]: Loadable<MerchantConfiguration>;
  [SliceNameTypes.App]: Loadable<MerchantApp[]>;
  [SliceNameTypes.CustomDocuments]: Loadable<any[]>;
  [SliceNameTypes.Flows]: Loadable<IFlow[]>;
  currentFlow: string | null;
}
