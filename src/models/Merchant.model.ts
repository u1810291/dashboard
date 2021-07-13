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
  CanUseLongPolling = 'can-use-long-polling',
  CanUseNom151 = 'can-use-nom-151',
  CanUseProofOfOwnership = 'can-use-proof-of-ownership',
  CanDisableFullstory = 'can-disable-fullstory',
  CanUseVerificationPostponedTimeout = 'can-use-verification-postponed-timeout',
  CanUseReverificationFlow = 'can-use-reverification-flow',
  CanUsePhoneValidation = 'can-use-phone-validation',
  CanUseEmailValidation = 'can-use-email-validation',
}
