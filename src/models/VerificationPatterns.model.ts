import { AmlValidationTypes } from 'apps/Aml/models/Aml.model';
import { PhoneOwnershipValidationTypes } from 'apps/PhoneCheck/models/PhoneCheck.model';
import { IpCheckValidationTypes } from '../apps/IpCheck/models/IpCheck.model';

export enum VerificationPatternTypes {
  AgeValidation = 'age-check',
  ArgentinianDni = 'argentinian-dni-validation',
  ArgentinianRenaper = 'argentinian-renaper-validation',
  Biometrics = 'biometrics',
  BolivianOep = 'bolivian-oep-validation',
  BrazilianCpf = 'brazilian-cpf-validation',
  CreditArgentinianFidelitas = 'credit-argentinian-fidelitas-validation',
  CreditBrazilianSerasa = 'credit-brazilian-serasa-validation',
  ChileanRegistroCivil = 'chilean-registro-civil-validation',
  ColombianContraloria = 'colombian-contraloria-validation',
  ColombianNationalPolice = 'colombian-national-police-validation',
  ColombianNit = 'colombian-nit-validation',
  ColombianProcuraduria = 'colombian-procuraduria-validation',
  ColombianRegistraduria = 'colombian-registraduria-validation',
  ComplyAdvantageValidation = 'comply-advantage-validation',
  CostaRicanAtv = 'costa-rican-atv-validation',
  CostaRicanTse = 'costa-rican-tse-validation',
  CostaRicanSocialSecurity = 'costa-rican-social-security-validation',
  CustomWatchlistsValidation = 'custom-watchlists-validation',
  DominicanJce = 'dominican-jce-validation',
  DuplicateUserDetection = 'duplicate-user-detection',
  DuplicateUserValidation = 'duplicate-user-detection',
  EcuadorianRegistroCivil = 'ecuadorian-registro-civil-validation',
  EcuadorianSri = 'ecuadorian-sri-validation',
  EmailOwnershipValidation = 'email-ownership-validation',
  EmailRiskValidation = 'email-risk-validation',
  GhanaianGra = 'ghanaian-gra-validation',
  GuatemalanTse = 'guatemalan-tse-validation',
  IpValidation = 'ip-validation',
  HonduranRnp = 'honduran-rnp-validation',
  MexicanCurp = 'mexican-curp-validation',
  MexicanIne = 'mexican-ine-validation',
  MexicanPep = 'mexican-pep-validation',
  MexicanRfc = 'mexican-rfc-validation',
  PanamenianTribunalElectoral = 'panamenian-tribunal-electoral-validation',
  ParaguayanRcp = 'paraguayan-rcp-validation',
  PeruvianReniec = 'peruvian-reniec-validation',
  PeruvianSunat = 'peruvian-sunat-validation',
  PhoneOwnershipValidation = 'phone-ownership-validation',
  PhoneRiskValidation = 'phone-risk-analysis-validation',
  PremiumAmlWatchListsSearchValidation = 'premium-aml-watchlists-search-validation',
  ProofOfOwnership = 'proof-of-ownership',
  ReFacematch = 're-facematch',
  SalvadorianTse = 'salvadorian-tse-validation',
  VenezuelanCne = 'venezuelan-cne-validation',
  VenezuelanSeniat = 'venezuelan-seniat-validation',
  TemplateMatching = 'template-matching',
  DocumentReading = 'document-reading',
  VpnDetection = 'vpn-detection',
  ESignatureDocuments = 'electronic-signature-document-validation',
  FinancialInformationBankAccountsRetrieving = 'financial-information-bank-accounts-retrieving',
  FinancialInformationWorkAccountsRetrieving = 'financial-information-work-accounts-retrieving',
  FinancialInformationPayrollAccountsRetrieving = 'financial-information-payroll-accounts-retrieving',
}

export interface VerificationPatterns {
  [VerificationPatternTypes.ArgentinianDni]?: boolean;
  [VerificationPatternTypes.ArgentinianRenaper]?: boolean;
  [VerificationPatternTypes.CreditBrazilianSerasa]?: boolean;
  [VerificationPatternTypes.CreditArgentinianFidelitas]?: boolean;
  // TODO: @ggrigorev move Biometric.model to ts
  [VerificationPatternTypes.Biometrics]?: string; // BiometricTypes
  [VerificationPatternTypes.BolivianOep]?: boolean;
  // TODO: @ggrigorev move GovCheck.model to ts
  [VerificationPatternTypes.BrazilianCpf]?: string; // GovCheckStepTypes.BrazilianCpf
  [VerificationPatternTypes.EcuadorianRegistroCivil]?: boolean;
  [VerificationPatternTypes.EcuadorianSri]?: boolean;
  [VerificationPatternTypes.HonduranRnp]?: boolean;
  [VerificationPatternTypes.ChileanRegistroCivil]?: boolean;
  [VerificationPatternTypes.ColombianNationalPolice]?: boolean;
  [VerificationPatternTypes.ColombianNit]?: boolean;
  [VerificationPatternTypes.ColombianProcuraduria]?: boolean;
  [VerificationPatternTypes.ColombianRegistraduria]?: boolean;
  [VerificationPatternTypes.CostaRicanAtv]?: boolean;
  [VerificationPatternTypes.CostaRicanTse]?: boolean;
  [VerificationPatternTypes.CostaRicanSocialSecurity]?: boolean;
  [VerificationPatternTypes.CustomWatchlistsValidation]?: boolean;
  [VerificationPatternTypes.DominicanJce]?: boolean;
  [VerificationPatternTypes.ParaguayanRcp]?: boolean;
  [VerificationPatternTypes.DuplicateUserDetection]?: boolean;
  [VerificationPatternTypes.GuatemalanTse]?: boolean;
  [VerificationPatternTypes.IpValidation]?: IpCheckValidationTypes;
  [VerificationPatternTypes.MexicanCurp]?: boolean;
  [VerificationPatternTypes.MexicanIne]?: boolean;
  [VerificationPatternTypes.MexicanPep]?: boolean;
  [VerificationPatternTypes.MexicanRfc]?: boolean;
  [VerificationPatternTypes.PeruvianReniec]?: boolean;
  [VerificationPatternTypes.PeruvianSunat]?: boolean;
  [VerificationPatternTypes.PremiumAmlWatchListsSearchValidation]?: AmlValidationTypes;
  [VerificationPatternTypes.ProofOfOwnership]?: boolean;
  [VerificationPatternTypes.SalvadorianTse]?: boolean;
  [VerificationPatternTypes.PanamenianTribunalElectoral]?: boolean;
  [VerificationPatternTypes.PhoneOwnershipValidation]?: PhoneOwnershipValidationTypes;
  [VerificationPatternTypes.PhoneRiskValidation]?: boolean;
  [VerificationPatternTypes.VenezuelanCne]?: boolean;
  [VerificationPatternTypes.VenezuelanSeniat]?: boolean;
  [VerificationPatternTypes.ReFacematch]?: boolean;
  [VerificationPatternTypes.VpnDetection]?: boolean;
  [VerificationPatternTypes.EmailRiskValidation]?: boolean;
  [VerificationPatternTypes.EmailOwnershipValidation]?: string;
  [VerificationPatternTypes.VpnDetection]?: boolean;
  [VerificationPatternTypes.ESignatureDocuments]?: boolean;
  [VerificationPatternTypes.FinancialInformationBankAccountsRetrieving]?: boolean;
  [VerificationPatternTypes.FinancialInformationWorkAccountsRetrieving]?: boolean;
  [VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving]?: boolean;
}
