import { AmlValidationTypes } from '../apps/Aml/models/Aml.model';
import { PhoneOwnershipValidationTypes } from '../apps/PhoneCheck/models/PhoneCheck.model';

export enum VerificationPatternTypes {
  AgeValidation = 'age-check',
  ArgentinianDni = 'argentinian-dni-validation',
  ArgentinianRenaper = 'argentinian-renaper-validation',
  Biometrics = 'biometrics',
  BolivianOep = 'bolivian-oep-validation',
  BrazilianCpf = 'brazilian-cpf-validation',
  ChileanRegistroCivil = 'chilean-registro-civil-validation',
  ColombianNationalPolice = 'colombian-national-police-validation',
  ColombianProcuraduria = 'colombian-procuraduria-validation',
  ColombianRegistraduria = 'colombian-registraduria-validation',
  ComplyAdvantageValidation = 'comply-advantage-validation',
  CostaRicanAtv = 'costa-rican-atv-validation',
  CostaRicanTse = 'costa-rican-tse-validation',
  CostaRicanSocialSecurity = 'costa-rican-social-security-validation',
  DominicanJce = 'dominican-jce-validation',
  DuplicateUserDetection = 'duplicate-user-detection',
  DuplicateUserValidation = 'duplicate-user-detection',
  EcuadorianRegistroCivil = 'ecuadorian-registro-civil-validation',
  EmailOwnershipValidation = 'email-ownership-validation',
  EmailRiskValidation = 'email-risk-validation',
  GuatemalanTse = 'guatemalan-tse-validation',
  IpValidation = 'ip-validation',
  HonduranRnp = 'honduran-rnp-validation',
  MexicanCurp = 'mexican-curp-validation',
  MexicanIne = 'mexican-ine-validation',
  MexicanRfc = 'mexican-rfc-validation',
  PanamenianTribunalElectoral = 'panamenian-tribunal-electoral-validation',
  ParaguayanRcp = 'paraguayan-rcp-validation',
  PeruvianReniec = 'peruvian-reniec-validation',
  PhoneOwnershipValidation = 'phone-ownership-validation',
  PhoneRiskValidation = 'phone-risk-analysis-validation',
  PremiumAmlWatchListsSearchValidation = 'premium-aml-watchlists-search-validation',
  ProofOfOwnership = 'proof-of-ownership',
  ReFacematch = 're-facematch',
  SalvadorianTse = 'salvadorian-tse-validation',
  VenezuelanCne = 'venezuelan-cne-validation',
}

export interface VerificationPatterns {
  [VerificationPatternTypes.ArgentinianDni]?: boolean;
  [VerificationPatternTypes.ArgentinianRenaper]?: boolean;
  // TODO: @ggrigorev move Biometric.model to ts
  [VerificationPatternTypes.Biometrics]?: string; // BiometricTypes
  [VerificationPatternTypes.BolivianOep]?: boolean;
  // TODO: @ggrigorev move GovCheck.model to ts
  [VerificationPatternTypes.BrazilianCpf]?: string; // GovCheckStepTypes.BrazilianCpf
  [VerificationPatternTypes.EcuadorianRegistroCivil]?: boolean;
  [VerificationPatternTypes.HonduranRnp]?: boolean;
  [VerificationPatternTypes.ChileanRegistroCivil]?: boolean;
  [VerificationPatternTypes.ColombianRegistraduria]?: boolean;
  [VerificationPatternTypes.CostaRicanAtv]?: boolean;
  [VerificationPatternTypes.CostaRicanTse]?: boolean;
  [VerificationPatternTypes.CostaRicanSocialSecurity]?: boolean;
  [VerificationPatternTypes.DominicanJce]?: boolean;
  [VerificationPatternTypes.ParaguayanRcp]?: boolean;
  [VerificationPatternTypes.DuplicateUserDetection]?: boolean;
  [VerificationPatternTypes.IpValidation]?: boolean;
  [VerificationPatternTypes.MexicanCurp]?: boolean;
  [VerificationPatternTypes.MexicanIne]?: boolean;
  [VerificationPatternTypes.MexicanRfc]?: boolean;
  [VerificationPatternTypes.PeruvianReniec]?: boolean;
  [VerificationPatternTypes.PremiumAmlWatchListsSearchValidation]?: AmlValidationTypes;
  [VerificationPatternTypes.ProofOfOwnership]?: boolean;
  [VerificationPatternTypes.SalvadorianTse]?: boolean;
  [VerificationPatternTypes.PanamenianTribunalElectoral]?: boolean;
  [VerificationPatternTypes.PhoneOwnershipValidation]?: PhoneOwnershipValidationTypes;
  [VerificationPatternTypes.PhoneRiskValidation]?: boolean;
  [VerificationPatternTypes.VenezuelanCne]?: boolean;
  [VerificationPatternTypes.ReFacematch]?: boolean;
  [VerificationPatternTypes.EmailRiskValidation]?: boolean;
  [VerificationPatternTypes.EmailOwnershipValidation]?: string;
}
