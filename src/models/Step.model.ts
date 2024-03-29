import { getAlterationReason } from 'apps/alterationDetection/models/alterationDetection.model';
import { getFacematchStepExtra } from 'apps/facematch/models/facematch.model';
import { getTemplateMatchingStepExtraData } from 'apps/templateMatching/models/templateMatching.model';
import { isNil } from 'lib/isNil';
import { get } from 'lodash';
import { isCovidTolerance } from 'models/Covid.model';
import { getFieldsExtra } from 'models/Field.model';
import { AmlDocumentStepTypes, getPremiumAmlWatchlistsCheckExtraData } from 'apps/Aml/models/Aml.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export type StepStatusType = 0 | 100 | 200;

export enum StepTypes {
  ProofOfOwnership = 'proof-of-ownership',
  LivenessMovement = 'liveness',
  Selfie = 'selfie',
  // TODO @dkchv: wtf?
  Voice = 'voice',
  LivenessVoice = 'voice+liveness',
  PhoneOwnership = 'phone-ownership-validation',
  PhoneRiskValidation = 'phone-risk-analysis-validation',
  EmailOwnership = 'email-ownership-validation',
  EmailRisk = 'email-risk-validation',
}

export enum VerificationStepTypes {
  EmailOwnershipValidation = 'email-ownership-validation',
  EmailRiskValidation = 'email-risk-validation',
  Liveness = 'liveness',
  Voice = 'voice',
  Selfie = 'selfie',
  LocationIntelligence = 'geolocation',
  PhoneOwnershipValidation = 'phone-ownership-validation',
  PhoneRiskAnalysisValidation = 'phone-risk-analysis-validation',
  PhoneRiskValidation = 'phone-risk-analysis-validation',
  ReFacematch = 're-facematch',
  DuplicateUserDetection = 'duplicate-user-detection',
  BackgroundMexicanBuholegal = 'background-mexican-buholegal-validation',
  BackgroundBrazilianChecks = 'brazilian-background-checks',
  BackgroundBrazilianChecksLight = 'brazilian-background-checks-light',
  BackgroundBrazilianChecksFull = 'brazilian-background-checks-full',
  CustomWatchlistsValidation = 'custom-watchlists-validation',
  NigerianCacValidation = 'nigerian-cac-validation',
  NigerianLegalValidation = 'nigerian-legal-validation',
  PhilippineDlValidation = 'philippine-dl-validation',
  PhilippineUMIDSSNValidation = 'philippine-umid-ssn-validation',
  BasicWatchlistsValidation = 'basic-watchlists-validation',
  NigerianTinValidation = 'nigerian-tin-validation',
  IndonesianKTPValidation = 'indonesian-ktp-validation',
}

export enum StepStatus {
  Success = 'success',
  Failure = 'failure',
  Incomplete = 'incomplete',
  Checking = 'checking',
  Skipped = 'skipped',
  Default = 'default',
}

export enum StepCodeStatus {
  Pending = 0,
  Running = 100,
  Complete = 200,
}

export const LEGACY_ERROR = 'LegacyError';
export const FRONTEND_ERROR = 'FrontendError';
export const SYSTEM_ERROR = 'SystemError';
export const STEP_ERROR = 'StepError';

export interface StepError {
  code: string;
  message: string;
  type?: typeof LEGACY_ERROR | typeof FRONTEND_ERROR | typeof SYSTEM_ERROR | typeof STEP_ERROR;
}

// TODO: @richvoronov refactor this, figure out with types of steps for documents
export enum VerificationDocStepTypes {
  AgeValidation = 'age-check',
  IpValidation = 'ip-validation',
  DuplicateUserValidation = 'duplicate-user-detection',
}

export const DocumentStepTypes = {
  AlternationDetection: 'alteration-detection',
  FaceMatch: 'facematch',
  AgeValidation: VerificationPatternTypes.AgeValidation,
  BolivianOep: VerificationPatternTypes.BolivianOep,
  DocumentReading: VerificationPatternTypes.DocumentReading,
  TemplateMatching: VerificationPatternTypes.TemplateMatching,
  MexicanCurp: VerificationPatternTypes.MexicanCurp,
  MexicanIne: VerificationPatternTypes.MexicanIne,
  MexicanRfc: VerificationPatternTypes.MexicanRfc,
  BrazilianCpf: VerificationPatternTypes.BrazilianCpf,
  BrazilianCpfLight: VerificationPatternTypes.BrazilianCpfLight,
  BrazilianNoCriminalRecordsValidation: VerificationPatternTypes.BrazilianNoCriminalRecordsValidation,
  CreditArgentinianFidelitas: VerificationPatternTypes.CreditArgentinianFidelitas,
  CreditBrazilianSerasa: VerificationPatternTypes.CreditBrazilianSerasa,
  ChileanRut: VerificationPatternTypes.ChileanRut,
  ChileanDriverLicense: VerificationPatternTypes.ChileanDriverLicense,
  ChileanRegistroCivil: VerificationPatternTypes.ChileanRegistroCivil,
  ColombianBdua: VerificationPatternTypes.ColombianBdua,
  ColombianContraloria: VerificationPatternTypes.ColombianContraloria,
  ColombianNationalPolice: VerificationPatternTypes.ColombianNationalPolice,
  ColombianProcuraduria: VerificationPatternTypes.ColombianProcuraduria,
  ColombianNit: VerificationPatternTypes.ColombianNit,
  ColombianRunt: VerificationPatternTypes.ColombianRunt,
  ColombianSisben: VerificationPatternTypes.ColombianSisben,
  MexicanPep: VerificationPatternTypes.MexicanPep,
  ColombianRegistraduria: VerificationPatternTypes.ColombianRegistraduria,
  ColombianUnifiedLegalSearch: VerificationPatternTypes.ColombianUnifiedLegalSearch,
  ArgentinianRenaper: VerificationPatternTypes.ArgentinianRenaper,
  ArgentinianRenaperExtended: VerificationPatternTypes.ArgentinianRenaperExtended,
  ArgentinianRenaperFacematch: VerificationPatternTypes.ArgentinianRenaperFacematch,
  EcuadorianSri: VerificationPatternTypes.EcuadorianSri,
  EcuadorianRegistroCivil: VerificationPatternTypes.EcuadorianRegistroCivil,
  GhanaianGra: VerificationPatternTypes.GhanaianGra,
  GuatemalanTse: VerificationPatternTypes.GuatemalanTse,
  ParaguayanRcp: VerificationPatternTypes.ParaguayanRcp,
  PeruvianReniec: VerificationPatternTypes.PeruvianReniec,
  PeruvianSunat: VerificationPatternTypes.PeruvianSunat,
  PeruvianMigrationInstitute: VerificationPatternTypes.PeruvianMigrationInstitute,
  PeruvianHealthSocialSecurity: VerificationPatternTypes.PeruvianHealthSocialSecurity,
  CostaRicanAtv: VerificationPatternTypes.CostaRicanAtv,
  CostaRicanTse: VerificationPatternTypes.CostaRicanTse,
  CostaRicanSocialSecurity: VerificationPatternTypes.CostaRicanSocialSecurity,
  ArgentinianDni: VerificationPatternTypes.ArgentinianDni,
  SalvadorianTse: VerificationPatternTypes.SalvadorianTse,
  DominicanJce: VerificationPatternTypes.DominicanJce,
  DominicanRnc: VerificationPatternTypes.DominicanRnc,
  DuplicateUserDetectionCheck: VerificationPatternTypes.DuplicateUserDetection,
  HonduranRnp: VerificationPatternTypes.HonduranRnp,
  PremiumAmlWatchlistsCheck: VerificationPatternTypes.PremiumAmlWatchListsSearchValidation,
  PanamenianTribunalElectoral: VerificationPatternTypes.PanamenianTribunalElectoral,
  VenezuelanCne: VerificationPatternTypes.VenezuelanCne,
  VenezuelanSeniat: VerificationPatternTypes.VenezuelanSeniat,
  ReFacematch: VerificationPatternTypes.ReFacematch,
  KenyanEcitizen: VerificationPatternTypes.KenyanEcitizen,
  ArgentinianAnses: VerificationPatternTypes.ArgentinianAnses,
  UgandanElectoralCommission: VerificationPatternTypes.UgandanElectoralCommission,
  NigerianDl: VerificationPatternTypes.NigerianDl,
  ...AmlDocumentStepTypes,
};

export type StepIds = VerificationPatternTypes | StepTypes | VerificationDocStepTypes | VerificationStepTypes;

export interface IStep<DataType = any> {
  status: StepCodeStatus;
  id: StepIds;
  error: StepError | null;
  phase?: string;
  checkStatus?: StepStatus;
  completedAt?: string;
  isTip?: boolean;
  startedAt?: string;
  startCount?: number;
  data?: DataType;
  inner?: DataType;
  startedManuallyAt?: string;
}

export interface IStepExtra<T = any> extends IStep<T> {
  checkStatus?: StepStatus;
  isTip?: boolean;
}

export enum BiometricStepTypes {
  Liveness = 'liveness',
  Voice = 'voice',
  Selfie = 'selfie',
}

// used as 'id' of failed steps in check summary
export enum DocumentStepFrontendChecksTypes {
  ExpiredDate = 'expired-date',
  EmptyFields = 'empty-fields',
}

export const DocumentFrontendSteps = [
  DocumentStepFrontendChecksTypes.ExpiredDate,
  DocumentStepFrontendChecksTypes.EmptyFields,
];

export const DocumentSecuritySteps = [
  DocumentStepTypes.TemplateMatching,
  DocumentStepTypes.AlternationDetection,
  DocumentStepTypes.Watchlists,
  DocumentStepTypes.FaceMatch,
];

export const CountrySpecificCreditChecks = [
  DocumentStepTypes.CreditArgentinianFidelitas,
  DocumentStepTypes.CreditBrazilianSerasa,
];

export const CountrySpecificChecks = [
  DocumentStepTypes.MexicanCurp,
  DocumentStepTypes.MexicanIne,
  DocumentStepTypes.MexicanRfc,
  DocumentStepTypes.ArgentinianAnses,
  DocumentStepTypes.ArgentinianDni,
  DocumentStepTypes.ArgentinianRenaper,
  DocumentStepTypes.ArgentinianRenaperExtended,
  DocumentStepTypes.ArgentinianRenaperFacematch,
  DocumentStepTypes.BolivianOep,
  DocumentStepTypes.BrazilianCpf,
  DocumentStepTypes.BrazilianCpfLight,
  DocumentStepTypes.BrazilianNoCriminalRecordsValidation,
  DocumentStepTypes.ChileanRegistroCivil,
  DocumentStepTypes.ColombianBdua,
  DocumentStepTypes.ChileanDriverLicense,
  DocumentStepTypes.ColombianContraloria,
  DocumentStepTypes.ColombianNationalPolice,
  DocumentStepTypes.ColombianNit,
  DocumentStepTypes.ColombianProcuraduria,
  DocumentStepTypes.ColombianRunt,
  DocumentStepTypes.ColombianRegistraduria,
  DocumentStepTypes.ColombianUnifiedLegalSearch,
  DocumentStepTypes.ColombianSisben,
  DocumentStepTypes.EcuadorianSri,
  DocumentStepTypes.EcuadorianRegistroCivil,
  DocumentStepTypes.GhanaianGra,
  DocumentStepTypes.GuatemalanTse,
  DocumentStepTypes.HonduranRnp,
  DocumentStepTypes.MexicanPep,
  DocumentStepTypes.NigerianDl,
  DocumentStepTypes.ParaguayanRcp,
  DocumentStepTypes.PanamenianTribunalElectoral,
  DocumentStepTypes.DominicanJce,
  DocumentStepTypes.DominicanRnc,
  DocumentStepTypes.PeruvianReniec,
  DocumentStepTypes.PeruvianSunat,
  DocumentStepTypes.PeruvianHealthSocialSecurity,
  DocumentStepTypes.CostaRicanAtv,
  DocumentStepTypes.CostaRicanTse,
  DocumentStepTypes.SalvadorianTse,
  DocumentStepTypes.VenezuelanCne,
  DocumentStepTypes.VenezuelanSeniat,
  DocumentStepTypes.CostaRicanSocialSecurity,
  DocumentStepTypes.KenyanEcitizen,
  DocumentStepTypes.ChileanRut,
  DocumentStepTypes.UgandanElectoralCommission,
  DocumentStepTypes.PeruvianMigrationInstitute,
  VerificationPatternTypes.NigerianCac,
  VerificationStepTypes.NigerianLegalValidation,
  VerificationStepTypes.NigerianTinValidation,
  VerificationStepTypes.IndonesianKTPValidation,
  VerificationStepTypes.PhilippineDlValidation,
  VerificationStepTypes.PhilippineUMIDSSNValidation,
];

export function hasFailureStep(steps: IStep[]): boolean {
  if (!steps || !Array.isArray(steps)) {
    return false;
  }
  return steps.some((step) => step?.error);
}

// this is a priority step statuses for document from highest to lowest
const StepStatusesWeights = {
  [StepStatus.Failure]: 0,
  [StepStatus.Incomplete]: 1,
  [StepStatus.Checking]: 2,
  [StepStatus.Success]: 3,
};

export const StepStatusesWeightsOrder = [
  StepStatus.Failure,
  StepStatus.Incomplete,
  StepStatus.Checking,
  StepStatus.Success,
];

// TODO: refactor this to make it simpler
export function getDocumentStatus(steps) {
  const isAlterationDetectionFailed = steps.find((step) => step.id === DocumentStepTypes.AlternationDetection && step.checkStatus === StepStatus.Failure);
  if (isAlterationDetectionFailed) {
    return StepStatus.Failure;
  }

  const weight = steps.reduce((memo, { checkStatus }) => (memo > StepStatusesWeights[checkStatus] ? StepStatusesWeights[checkStatus] : memo), StepStatusesWeightsOrder.length - 1);
  return StepStatusesWeightsOrder[Math.max(weight, StepStatusesWeights[StepStatus.Incomplete])];
}

const StepIncompletionErrors = {
  [DocumentStepTypes.AgeValidation]: ['underage.noDOB'],
  [DocumentStepTypes.BrazilianCpfLight]: ['brazilianCpfLight.notEnoughParams'],
  [DocumentStepTypes.DuplicateUserDetectionCheck]: ['duplacateIdentityDetection.notValidParams'],
  [DocumentStepTypes.HonduranRnp]: ['honduranRnp.notEnoughParams'],
  [DocumentStepTypes.PremiumAmlWatchlistsCheck]: ['premiumAmlWatchlists.notValidParams'],
  [DocumentStepTypes.ParaguayanRcp]: ['paraguayanRcp.notEnoughParams'],
  [DocumentStepTypes.Watchlists]: ['watchlists.notEnoughParams'],
  [DocumentStepTypes.ArgentinianAnses]: ['argentinianAnses.notEnoughParams'],
  [DocumentStepTypes.ArgentinianDni]: ['argentinianDni.notEnoughParams'],
  [DocumentStepTypes.CostaRicanAtv]: ['costaRicanAtv.notEnoughParams'],
  [DocumentStepTypes.ArgentinianRenaperExtended]: ['argentinianRenaperExtended.notEnoughParams'],
  [DocumentStepTypes.ArgentinianRenaperFacematch]: ['argentinianRenaperFacematch.notEnoughParams'],
  [DocumentStepTypes.BolivianOep]: ['bolivianOep.notEnoughParams'],
  [DocumentStepTypes.ChileanRegistroCivil]: ['chileanRegistroCivil.notEnoughParams'],
  [DocumentStepTypes.ChileanDriverLicense]: ['chileanDriverLicense.notEnoughParams'],
  [DocumentStepTypes.ColombianContraloria]: ['colombianContraloria.notEnoughParams'],
  [DocumentStepTypes.ColombianProcuraduria]: ['colombianProcuraduria.notEnoughParams'],
  [DocumentStepTypes.ColombianRunt]: ['colombianRunt.notEnoughParams', 'colombianRunt.notValidParams'],
  [DocumentStepTypes.ColombianSisben]: ['colombianSisben.notEnoughParams', 'colombianSisben.notValidParams'],
  [DocumentStepTypes.CostaRicanTse]: ['costaRicanTse.notEnoughParams'],
  [DocumentStepTypes.EcuadorianSri]: ['ecuadorianSri.notEnoughParams'],
  [DocumentStepTypes.EcuadorianRegistroCivil]: ['ecuadorianRegistroCivil.notEnoughParams'],
  [DocumentStepTypes.GhanaianGra]: ['ghanaianGra.notEnoughParams'],
  [DocumentStepTypes.GuatemalanTse]: ['guatemalanTse.notEnoughParams'],
  [DocumentStepTypes.MexicanPep]: ['mexicanPep.notEnoughParams'],
  [DocumentStepTypes.NigerianDl]: ['nigerianDl.notEnoughParams'],
  [DocumentStepTypes.SalvadorianTse]: ['salvadorianTse.notEnoughParams'],
  [DocumentStepTypes.ColombianBdua]: ['colombianBdua.notEnoughParams'],
  [DocumentStepTypes.ColombianNationalPolice]: ['colombianNationPolice.notEnoughParams'],
  [DocumentStepTypes.ColombianNit]: ['colombianNit.notEnoughParams'],
  [DocumentStepTypes.ColombianUnifiedLegalSearch]: ['colombianUnifiedLegalSearch.notEnoughParams', 'colombianUnifiedLegalSearch.notValidParams'],
  [DocumentStepTypes.CostaRicanSocialSecurity]: ['costaRicanSocialSecurity.notEnoughParams'],
  [DocumentStepTypes.PanamenianTribunalElectoral]: ['panamenianTribunalElectoral.notEnoughParams'],
  [DocumentStepTypes.DominicanJce]: ['dominicanJce.notEnoughParams'],
  [DocumentStepTypes.DominicanRnc]: ['dominicanRnc.notEnoughParams'],
  [DocumentStepTypes.VenezuelanCne]: ['venezuelanCne.notEnoughParams'],
  [StepTypes.PhoneOwnership]: ['phoneOwnership.notEnoughParams', 'phoneOwnership.skipped'],
  [StepTypes.PhoneRiskValidation]: ['phoneRisk.skipped'],
  [StepTypes.EmailOwnership]: ['emailOwnership.notEnoughParams', 'emailOwnership.skipped'],
  [StepTypes.EmailRisk]: ['emailRisk.notEnoughParams', 'emailRisk.skipped'],
  [DocumentStepTypes.VenezuelanSeniat]: ['venezuelanSeniat.notEnoughParams'],
  [DocumentStepTypes.KenyanEcitizen]: ['kenyanEcitizen.notEnoughParams'],
  [DocumentStepTypes.PeruvianSunat]: ['peruvianSunat.notEnoughParams'],
  [DocumentStepTypes.UgandanElectoralCommission]: ['ugandanElectoralCommission.notEnoughParams'],
  [DocumentStepTypes.BrazilianNoCriminalRecordsValidation]: ['brazilianNoCriminalRecordsValidation.notEnoughParams'],
  [VerificationDocStepTypes.DuplicateUserValidation]: ['duplicateUserDetection.notValidParams'],
  [VerificationStepTypes.BackgroundBrazilianChecks]: ['brazilianBackgroundChecks.documentNotFound'],
};

export const OptionalGovCheckErrorCodes = {
  [DocumentStepTypes.ArgentinianRenaperExtended]: ['argentinianRenaperExtended.deceasedPerson', 'argentinianRenaperExtended.dniMismatch', 'argentinianRenaperExtended.hasNoCuit'],
  [DocumentStepTypes.BrazilianCpf]: ['brazilianCpf.faceBiometricsMismatch'],
  [DocumentStepTypes.PeruvianReniec]: ['peruvianReniec.fullNameMismatch'],
  [DocumentStepTypes.MexicanPep]: ['mexicanPep.matchFound'],
  [DocumentStepTypes.ChileanRut]: ['chileanRut.fullNameMismatch'],
  [DocumentStepTypes.ChileanDriverLicense]: ['chileanDriverLicense.fullNameMismatch', 'chileanDriverLicense.blocked'],
  [DocumentStepTypes.UgandanElectoralCommission]: ['ugandanElectoral.fullNameMismatch'],
  [DocumentStepTypes.NigerianDl]: ['nigerianDl.fullNameMismatch'],
  [DocumentStepTypes.ColombianRunt]: ['colombianRunt.fullNameMismatch', 'colombianRunt.hasFines'],
  [DocumentStepTypes.ArgentinianRenaper]: ['argentinianRenaper.deceasedPerson', 'argentinianRenaper.fullNameMismatch'],
  [VerificationStepTypes.NigerianLegalValidation]: ['nigerianLegal.fullNameMismatch', 'nigerianLegal.faceMismatch'],
  [VerificationStepTypes.PhilippineDlValidation]: ['philippineDL.fullNameMismatch', 'philippineDL.dateOfBirthMismatch'],
  [VerificationStepTypes.IndonesianKTPValidation]: ['indonesianKTP.faceBiometricsMismatch', 'indonesianKTP.dobMismatch', 'indonesianKTP.fullNameMismatch'],
  [DocumentStepTypes.ColombianSisben]: ['colombianSisben.fullNameMismatch'],
  [DocumentStepTypes.DominicanRnc]: ['dominicanRnc.nameMismatch'],
};

export const BackgroundChecksErrorsToHide = {
  'brazilianBackgroundChecks.documentNotFound': true,
};

export const RootGovChecksErrorsToHide = {
  'nigerianLegal.documentNotFound': true,
  'peruvianMigrationInstitute.documentNotFound': true,
};

export const StepSkippedCodes = [
  'customDocument.skipped',
  'customDocument.notProvided',
];

export const MinorErrorCodes = [
  'philippineDL.incompleteDataReceived',
];

function getAltered(step, verification, countries, document) {
  switch (step.id) {
    case DocumentStepTypes.AlternationDetection:
      return getAlterationReason(step);
    case DocumentStepTypes.FaceMatch: {
      const steps = get(verification, '_embedded.verification.steps') || [];
      const pooStep = steps.find((item) => item.id === StepTypes.ProofOfOwnership);
      return getFacematchStepExtra(step, pooStep, verification, document);
    }
    case DocumentStepTypes.TemplateMatching:
      return getTemplateMatchingStepExtraData(step, verification, countries, document);
    case DocumentStepTypes.PremiumAmlWatchlistsCheck:
      return getPremiumAmlWatchlistsCheckExtraData(step, document, verification);
    default:
      return step;
  }
}

export interface IPremiumAmlWatchlistStepData {
  isMonitoringAvailable: boolean;
  nameSearched: string;
  profileUrl?: string;
  searchId: number;
  searchedOn: string;
  updatedOn?: string;
  searchedCountries?: string[];
}

export function getDocumentStep(id, steps = []) {
  return steps.find((step) => step.id === id) || {};
}

// TODO function gets step as a param but we cant use IStep interface for now
// because not all step typings are inherited from IStep
export function getStepStatus(step): StepStatus {
  const { id, status, data = {}, error } = step || {};

  if (error?.type === FRONTEND_ERROR && error.code === DocumentStepFrontendChecksTypes.EmptyFields) {
    return StepStatus.Success;
  }

  if (status !== 200) {
    return StepStatus.Checking;
  }

  if (id === DocumentStepTypes.PremiumAmlWatchlistsCheck && (data as IPremiumAmlWatchlistStepData)?.updatedOn) {
    return StepStatus.Failure;
  }

  if (!error) {
    return StepStatus.Success;
  }

  const code = get(error, 'code');

  if (StepSkippedCodes.includes(code)) {
    return StepStatus.Skipped;
  }

  if (MinorErrorCodes.includes(code)) {
    return StepStatus.Success;
  }

  return code && StepIncompletionErrors[id] && StepIncompletionErrors[id].includes(code)
    ? StepStatus.Incomplete
    : StepStatus.Failure;
}

export function getStepExtra<T = any>(step: IStep<T>, verification?: any, countries?: any, document?: any) {
  if (!step) {
    return step;
  }

  const altered = getAltered(step, verification, countries, document);

  return {
    ...altered,
    checkStatus: getStepStatus(step),
    // extras (DocumentStepFrontendChecksTypes) and Gov-checks has no tip
    isTip: Object.values(DocumentStepTypes).includes(step.id) && !CountrySpecificChecks.includes(step.id as VerificationPatternTypes),
  };
}

export function getReaderFrontendSteps(readerStep?) {
  const steps = [];

  if (!readerStep) {
    return steps;
  }

  const fields = getFieldsExtra(readerStep.data);
  const emptyFields = fields.filter((item) => !item.value);

  steps.push({
    ...readerStep,
    id: DocumentStepFrontendChecksTypes.EmptyFields,
    error: fields.length === 0 || emptyFields.length > 0 ? {
      type: FRONTEND_ERROR,
      code: DocumentStepFrontendChecksTypes.EmptyFields,
    } : null,
  });

  return steps;
}

export function getComputedSteps(readerStep, verification, document) {
  const steps = [];
  const isDocumentExpired = verification?.computed?.isDocumentExpired?.data?.[document?.type];
  const isUndetermined = isNil(isDocumentExpired);
  const isCovid = isCovidTolerance(document.fields?.expirationDate?.value, document.country);

  if (isUndetermined) {
    return steps;
  }

  steps.push({
    ...readerStep,
    id: DocumentStepFrontendChecksTypes.ExpiredDate,
    error: isDocumentExpired && !isCovid ? {
      code: DocumentStepFrontendChecksTypes.ExpiredDate,
    } : null,
    labelExtra: isCovid ? 'SecurityCheckStep.expired-date.success-covid' : null,
  });

  return steps;
}

export function getStepsExtra(steps = [], verification, countries, document) {
  const readerStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);

  return [
    ...getReaderFrontendSteps(readerStep),
    ...getComputedSteps(readerStep, verification, document),
    ...steps,
  ].map((item) => getStepExtra(item, verification, countries, document));
}

export function isSecondaryGovCheckError(id: string, errorCode: string): boolean {
  return OptionalGovCheckErrorCodes[id] && OptionalGovCheckErrorCodes[id].includes(errorCode);
}
