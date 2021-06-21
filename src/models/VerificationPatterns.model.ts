export interface VerificationPatterns {
  'argentinian-dni-validation'?: boolean,
  'argentinian-renaper-validation'?: boolean,
  // TODO: @ggrigorev move Biometric.model to ts
  biometrics?: string, // BiometricTypes
  'bolivian-oep-validation'?: boolean,
  // TODO: @ggrigorev move GovCheck.model to ts
  'brazilian-cpf-validation'?: string, // GovCheckStepTypes.BrazilianCpf
  'colombian-registraduria-validation'?: boolean,
  'chilean-registro-civil-validation'?: boolean,
  'comply-advantage-validation'?: boolean,
  'costa-rican-social-security-validation'?: boolean,
  'costa-rican-tse-validation'?: boolean,
  'dominican-jce-validation'?: boolean,
  'duplicate-user-detection'?: boolean,
  'paraguayan-rcp-validation'?: boolean,
  'ecuadorian-registro-civil-validation'?: boolean,
  'honduran-rnp-validation'?: boolean,
  'ip-validation'?: boolean,
  'mexican-curp-validation'?: boolean,
  'mexican-ine-validation'?: boolean,
  'mexican-rfc-validation'?: boolean,
  'panamenian-tribunal-electoral-validation'?: boolean,
  'peruvian-reniec-validation'?: boolean,
  'proof-of-ownership'?: boolean,
  // TODO: @ggrigorev move premiumAmlWatchlistsIntegratedCheck.model to ts
  'premium-aml-watchlists-search-validation'?: string, // PremiumAmlWatchlistsValidationTypes
  'salvadorian-tse-validation'?: boolean,
  'venezuelan-cne-validation'?: boolean,
}
