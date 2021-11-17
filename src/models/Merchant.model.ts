export interface Merchant {
  logoUrl: string;
  id: string;
  blockedAt: Date;
  collaborators: any[];
  createdAt: Date;
  displayName: string;
  businessName: string;
  owner: string;
  updatedAt: Date;
  tags: MerchantTags[];
}

export enum MerchantTags {
  CanUseCreditChecks = 'can-use-credit-checks',
  CanUseLongPolling = 'can-use-long-polling',
  CanUseNom151 = 'can-use-nom-151',
  CanUseProofOfOwnership = 'can-use-proof-of-ownership',
  CanDisableFullstory = 'can-disable-fullstory',
  CanUseVerificationPostponedTimeout = 'can-use-verification-postponed-timeout',
  CanUseReverificationFlow = 'can-use-reverification-flow',
  CanUseCustomDocumentAdvancedValidation = 'can-use-custom-document-advanced-validations',
  CanUseCustomDocument = 'can-use-custom-document',
  CanUseESignature = 'can-use-esignature',
  CanUsePhoneValidation = 'can-use-phone-validation',
  CanUseEmailValidation = 'can-use-email-validation',
  CanUseCreditScore = 'can-use-credit-score',
  CanUseFinancialInformationBankAccountsRetrieving = 'can-use-financial-information-bank-accounts-retrieving',
  CanUseFinancialInformationWorkAccountsRetrieving = 'can-use-financial-information-work-accounts-retrieving',
  CanUseFinancialInformationPayrollAccountsRetrieving = 'can-use-financial-information-payroll-accounts-retrieving',
}
