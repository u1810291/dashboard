export type MerchantId = string;

export interface ISenderEmail {
  verified: boolean;
  address: string;
}

export interface IAgentNotesConfig {
  requiredOnChangeVerificationStatus: boolean;
}
export interface IMerchantSettings {
  agentNotesConfig: IAgentNotesConfig;
  senderEmails: ISenderEmail[];
  // TODO: @nikitaafanasyev add correct typing
  customDocumentConfig: unknown[];
}

export interface IStepsOptions {
  stepId: string;
  completed: boolean;
}

export interface IMerchant {
  logoUrl: string;
  id: MerchantId;
  blockedAt: Date;
  collaborators: any[];
  createdAt: Date;
  displayName: string;
  businessName: string;
  owner: string;
  updatedAt: Date;
  tags: MerchantTags[];
  settings: IMerchantSettings;
  onboardingSteps?: IStepsOptions[];
}

export enum MerchantTags {
  CanUseDashboardAutomaticLogout = 'can-use-dashboard-automatic-logout',
  CanUseCreditChecks = 'can-use-credit-checks',
  CanUseBackgroundChecks = 'can-use-background-checks',
  CanUseLongPolling = 'can-use-long-polling',
  CanUseNom151 = 'can-use-nom-151',
  CanUseProofOfOwnership = 'can-use-proof-of-ownership',
  CanDisableFullstory = 'can-disable-fullstory',
  CanUseVerificationPostponedTimeout = 'can-use-verification-postponed-timeout',
  CanUseReverificationFlow = 'can-use-reverification-flow',
  CanUseCustomDocumentAdvancedValidation = 'can-use-custom-document-advanced-validations',
  CanUseCustomDocument = 'can-use-custom-document',
  CanUseCustomField = 'can-use-custom-fields',
  CanUseESignature = 'can-use-esignature',
  CanUsePhoneValidation = 'can-use-phone-validation',
  CanUseEmailValidation = 'can-use-email-validation',
  CanUseCustomWatchlists = 'can-use-custom-watchlists',
  CanUseCreditScore = 'can-use-credit-score',
  CanUseFinancialInformationBankAccountsRetrieving = 'can-use-financial-information-bank-accounts-retrieving',
  CanUseFinancialInformationWorkAccountsRetrieving = 'can-use-financial-information-work-accounts-retrieving',
  CanUseFinancialInformationPayrollAccountsRetrieving = 'can-use-financial-information-payroll-accounts-retrieving',
  CanUseFacematchCPFInAr = 'can-use-facematch-in-ar-govchecks',
  CanUseFacematchCPFInBr = 'can-use-facematch-in-br-govchecks',
  CanUseAddSolutionToCatalog = 'can-add-solution-to-catalog',
  CanUseIndonesianKTP = 'can-use-indonesian-ktp',
  CanUseArRenaperExtended = 'can-use-ar-renaper-extended-govcheck',
  CanUseNigerianBNV = 'can-use-nigerian-bvn',
  CanUseV2Workflow = 'can-use-v2-workflow',
  CanUseNigerianCac = 'can-use-nigerian-cac',
  CanUseNigerianTin = 'can-use-nigerian-tin',
  CanUseNigerianDL = 'can-use-nigerian-dl',
  CanUseNigerianNIN = 'can-use-nigerian-nin',
  CanUseNigerianVIN = 'can-use-nigerian-vin',
  CanUseBasicWatchlists = 'can-use-basic-watchlists',
  CanManageBasicWatchlists = 'can-manage-basic-watchlists',
  CanUseDuplicateFaceDetection = 'can-use-duplicate-face-detection',
  CanUseHighAccuracyLocationTracking = 'can-use-high-accuracy-location-tracking',
  CanUseSolutionTemplates = 'can-use-solution-templates',
  CanUsePremiumAmlWatchlistsSearch = 'can-use-premium-aml-watchlists-search',
  CanUsePremiumAmlWatchlistsSearchAndMonitoring = 'can-use-premium-aml-watchlists-search-and-monitoring',
  UseSigmaAnalyticsWidget = 'can-use-sigma-widget'
}

export const SupportEmail = 'support@metamap.com';
