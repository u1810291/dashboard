export type MerchantId = string;

export interface ISenderEmail {
  verified: boolean;
  address: string;
}
export interface IMerchantSettings {
  senderEmails: ISenderEmail[];
  // TODO: @nikitaafanasyev add correct typing
  customDocumentConfig: unknown[];
}

export interface StepsOptions {
  stepId: string;
  completed: boolean;
}

export interface Merchant {
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
  onboardingSteps?: StepsOptions[];
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
  CanUseArRenaperExtended = 'can-use-ar-renaper-extended-govcheck',
  CanUseNigerianBNV = 'can-use-nigerian-bvn',
}
