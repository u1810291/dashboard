import { AmlValidationTypes } from 'apps/Aml/models/Aml.model';
import { PhoneOwnershipValidationTypes } from 'apps/PhoneCheck/models/PhoneCheck.model';
import { IpCheckValidationTypes } from '../apps/IpCheck/models/IpCheck.model';

export enum VerificationPatternTypes {
  AgeValidation = 'age-check',
  ArgentinianAnses = 'argentinian-anses-validation',
  ArgentinianDni = 'argentinian-dni-validation',
  ArgentinianRenaperExtended = 'argentinian-renaper-extended-validation',
  ArgentinianRenaperFacematch = 'argentinian-renaper-facematch-validation',
  ArgentinianRenaper = 'argentinian-renaper-validation',
  Biometrics = 'biometrics',
  BolivianOep = 'bolivian-oep-validation',
  BrazilianCpf = 'brazilian-cpf-validation',
  BrazilianNoCriminalRecordsValidation = 'brazilian-no-criminal-records-validation',
  BackgroundMexicanBuholegal = 'background-mexican-buholegal-validation',
  CreditArgentinianFidelitas = 'credit-argentinian-fidelitas-validation',
  CreditBrazilianSerasa = 'credit-brazilian-serasa-validation',
  ChileanRut = 'chilean-rut-validation',
  ChileanRegistroCivil = 'chilean-registro-civil-validation',
  ColombianBdua = 'colombian-bdua-validation',
  ChileanDriverLicense = 'chilean-driver-license-validation',
  ColombianContraloria = 'colombian-contraloria-validation',
  ColombianNationalPolice = 'colombian-national-police-validation',
  ColombianNit = 'colombian-nit-validation',
  ColombianProcuraduria = 'colombian-procuraduria-validation',
  ColombianRegistraduria = 'colombian-registraduria-validation',
  ColombianRunt = 'colombian-runt-validation',
  ColombianSisben = 'colombian-sisben-validation',
  ComplyAdvantageValidation = 'comply-advantage-validation',
  CostaRicanAtv = 'costa-rican-atv-validation',
  CostaRicanTse = 'costa-rican-tse-validation',
  CostaRicanSocialSecurity = 'costa-rican-social-security-validation',
  CustomWatchlistsValidation = 'custom-watchlists-validation',
  CustomFieldsValidation = 'custom-fields-validation',
  DominicanJce = 'dominican-jce-validation',
  DominicanRnc = 'dominican-rnc-validation',
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
  KenyanEcitizen = 'kenyan-ecitizen-validation',
  MexicanCurp = 'mexican-curp-validation',
  MexicanIne = 'mexican-ine-validation',
  MexicanPep = 'mexican-pep-validation',
  MexicanRfc = 'mexican-rfc-validation',
  NigerianDl = 'nigerian-dl-validation',
  NigerianNin = 'nigerian-nin-validation',
  NigerianVin = 'nigerian-vin-validation',
  NigerianBvn = 'nigerian-bvn-validation',
  NigerianLegal = 'nigerian-legal-validation',
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
  Facematch = 'facematch-service-validation',
  UgandanElectoralCommission = 'ugandan-electoral-commission-validation',
}

export interface VerificationPatterns {
  [VerificationPatternTypes.ArgentinianAnses]?: boolean;
  [VerificationPatternTypes.ArgentinianDni]?: boolean;
  [VerificationPatternTypes.ArgentinianRenaper]?: string;
  [VerificationPatternTypes.ArgentinianRenaperExtended]?: boolean;
  [VerificationPatternTypes.ArgentinianRenaperFacematch]?: boolean;
  [VerificationPatternTypes.CreditBrazilianSerasa]?: boolean;
  [VerificationPatternTypes.CreditArgentinianFidelitas]?: boolean;
  // TODO: @ggrigorev move Biometric.model to ts
  [VerificationPatternTypes.Biometrics]?: string; // BiometricTypes
  [VerificationPatternTypes.BolivianOep]?: boolean;
  // TODO: @ggrigorev move GovCheck.model to ts
  [VerificationPatternTypes.BrazilianCpf]?: string; // GovCheckStepTypes.BrazilianCpf
  [VerificationPatternTypes.BackgroundMexicanBuholegal]?: boolean;
  [VerificationPatternTypes.EcuadorianRegistroCivil]?: boolean;
  [VerificationPatternTypes.EcuadorianSri]?: boolean;
  [VerificationPatternTypes.HonduranRnp]?: boolean;
  [VerificationPatternTypes.ChileanRut]?: boolean;
  [VerificationPatternTypes.ChileanRegistroCivil]?: boolean;
  [VerificationPatternTypes.ColombianBdua]?: boolean;
  [VerificationPatternTypes.ChileanDriverLicense]?: boolean;
  [VerificationPatternTypes.ColombianNationalPolice]?: boolean;
  [VerificationPatternTypes.ColombianNit]?: boolean;
  [VerificationPatternTypes.ColombianProcuraduria]?: boolean;
  [VerificationPatternTypes.ColombianRegistraduria]?: boolean;
  [VerificationPatternTypes.ColombianRunt]?: boolean;
  [VerificationPatternTypes.ColombianSisben]?: boolean;
  [VerificationPatternTypes.CostaRicanAtv]?: boolean;
  [VerificationPatternTypes.CostaRicanTse]?: boolean;
  [VerificationPatternTypes.CostaRicanSocialSecurity]?: boolean;
  [VerificationPatternTypes.CustomWatchlistsValidation]?: boolean;
  [VerificationPatternTypes.CustomFieldsValidation]?: boolean;
  [VerificationPatternTypes.DominicanJce]?: boolean;
  [VerificationPatternTypes.DominicanRnc]?: boolean;
  [VerificationPatternTypes.ParaguayanRcp]?: boolean;
  [VerificationPatternTypes.DuplicateUserDetection]?: boolean;
  [VerificationPatternTypes.GuatemalanTse]?: boolean;
  [VerificationPatternTypes.IpValidation]?: IpCheckValidationTypes;
  [VerificationPatternTypes.KenyanEcitizen]?: boolean;
  [VerificationPatternTypes.MexicanCurp]?: boolean;
  [VerificationPatternTypes.MexicanIne]?: boolean;
  [VerificationPatternTypes.MexicanPep]?: boolean;
  [VerificationPatternTypes.MexicanRfc]?: boolean;
  [VerificationPatternTypes.NigerianDl]?: boolean;
  [VerificationPatternTypes.NigerianNin]?: boolean;
  [VerificationPatternTypes.NigerianBvn]?: boolean;
  [VerificationPatternTypes.NigerianVin]?: boolean;
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
  [VerificationPatternTypes.Facematch]?: boolean;
  [VerificationPatternTypes.UgandanElectoralCommission]?: boolean;
}
