import { getAlterationReason } from 'apps/alterationDetection/models/alterationDetection.model';
import { getFacematchStepExtra } from 'apps/facematch/models/facematch.model';
import { getPremiumAmlWatchlistsCheckExtraData } from 'apps/premiumAmlWatchlistsIntegratedCheck/models/premiumAmlWatchlistsIntegratedCheck.model';
import { getTemplateMatchingStepExtraData } from 'apps/templateMatching/models/templateMatching.model';
import { isEmpty } from 'lib/checks';
import { get } from 'lodash';
import { isCovidTolerance } from 'models/Covid.model';
import { getFieldsExtra } from 'models/Field.model';

export const StepTypes = {
  ProofOfOwnership: 'proof-of-ownership',
  LivenessMovement: 'liveness',
  Selfie: 'selfie',
  // TODO @dkchv: wtf?
  Voice: 'voice',
  LivenessVoice: 'voice+liveness',
  PhoneOwnership: 'phone-ownership-validation',
  PhoneRiskValidation: 'phone-risk-analysis-validation',
  EmailOwnership: 'email-ownership-validation',
  EmailRisk: 'email-risk-validation',
};

export const VerificationPatternTypes = {
  AgeValidation: 'age-check',
  BolivianOep: 'bolivian-oep-validation',
  ChileanRegistroCivil: 'chilean-registro-civil-validation',
  ColombianNationalPolice: 'colombian-national-police-validation',
  ColombianProcuraduria: 'colombian-procuraduria-validation',
  ColombianRegistraduria: 'colombian-registraduria-validation',
  CostaRicanAtv: 'costa-rican-atv-validation',
  CostaRicanTse: 'costa-rican-tse-validation',
  CostaRicanSocialSecurity: 'costa-rican-social-security-validation',
  ArgentinianRenaper: 'argentinian-renaper-validation',
  ArgentinianDni: 'argentinian-dni-validation',
  EcuadorianRegistroCivil: 'ecuadorian-registro-civil-validation',
  EcuadorianSri: 'ecuadorian-sri-validation',
  GuatemalanTse: 'guatemalan-tse-validation',
  HonduranRnp: 'honduran-rnp-validation',
  ParaguayanRcp: 'paraguayan-rcp-validation',
  PeruvianReniec: 'peruvian-reniec-validation',
  SalvadorianTse: 'salvadorian-tse-validation',
  PanamenianTribunalElectoral: 'panamenian-tribunal-electoral-validation',
  Biometrics: 'biometrics',
  ProofOfOwnership: 'proof-of-ownership',
  IpValidation: 'ip-validation',
  DuplicateUserValidation: 'duplicate-user-detection',
  ComplyAdvantageValidation: 'comply-advantage-validation',
  PhoneOwnershipValidation: 'phone-ownership-validation',
  EmailOwnershipValidation: 'email-ownership-validation',
  EmailRiskValidation: 'email-risk-validation',
  PremiumAmlWatchlistsCheck: 'premium-aml-watchlists-search-validation',
  PhoneRiskValidation: 'phone-risk-analysis-validation',
  DominicanJce: 'dominican-jce-validation',
  VenezuelanCne: 'venezuelan-cne-validation',
};

export const DocumentStepTypes = {
  AgeValidation: 'age-check',
  BolivianOep: VerificationPatternTypes.BolivianOep,
  DocumentReading: 'document-reading',
  AlternationDetection: 'alteration-detection',
  Watchlists: 'watchlists',
  FaceMatch: 'facematch',
  TemplateMatching: 'template-matching',
  CURP: 'mexican-curp-validation',
  INE: 'mexican-ine-validation',
  RFC: 'mexican-rfc-validation',
  BrazilianCpf: 'brazilian-cpf-validation',
  ChileanRegistroCivil: VerificationPatternTypes.ChileanRegistroCivil,
  ColombianNationalPolice: VerificationPatternTypes.ColombianNationalPolice,
  ColombianProcuraduria: VerificationPatternTypes.ColombianProcuraduria,
  ColombianRegistraduria: VerificationPatternTypes.ColombianRegistraduria,
  ArgentinianRenaper: VerificationPatternTypes.ArgentinianRenaper,
  EcuadorianSri: VerificationPatternTypes.EcuadorianSri,
  EcuadorianRegistroCivil: VerificationPatternTypes.EcuadorianRegistroCivil,
  GuatemalanTse: VerificationPatternTypes.GuatemalanTse,
  ParaguayanRcp: VerificationPatternTypes.ParaguayanRcp,
  PeruvianReniec: VerificationPatternTypes.PeruvianReniec,
  CostaRicanAtv: VerificationPatternTypes.CostaRicanAtv,
  CostaRicanTse: VerificationPatternTypes.CostaRicanTse,
  CostaRicanSocialSecurity: VerificationPatternTypes.CostaRicanSocialSecurity,
  ArgentinianDni: VerificationPatternTypes.ArgentinianDni,
  SalvadorianTse: VerificationPatternTypes.SalvadorianTse,
  DominicanJce: VerificationPatternTypes.DominicanJce,
  DuplicateUserDetectionCheck: 'duplicate-user-detection',
  HonduranRnp: VerificationPatternTypes.HonduranRnp,
  PremiumAmlWatchlistsCheck: 'premium-aml-watchlists-search-validation',
  PanamenianTribunalElectoral: 'panamenian-tribunal-electoral-validation',
  VenezuelanCne: VerificationPatternTypes.VenezuelanCne,
};

export const BiometricStepTypes = {
  Liveness: 'liveness',
  Voice: 'voice',
  Selfie: 'selfie',
};

// used as 'id' of failed steps in check summary
export const DocumentStepFrontendChecksTypes = {
  ExpiredDate: 'expired-date',
  EmptyFields: 'empty-fields',
};

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

export const DocumentMxSteps = [
  DocumentStepTypes.CURP,
  DocumentStepTypes.INE,
  DocumentStepTypes.RFC,
];

export const CountrySpecificChecks = [
  ...DocumentMxSteps,
  DocumentStepTypes.ArgentinianDni,
  DocumentStepTypes.ArgentinianRenaper,
  DocumentStepTypes.BolivianOep,
  DocumentStepTypes.BrazilianCpf,
  DocumentStepTypes.ChileanRegistroCivil,
  DocumentStepTypes.ColombianNationalPolice,
  DocumentStepTypes.ColombianProcuraduria,
  DocumentStepTypes.ColombianRegistraduria,
  DocumentStepTypes.EcuadorianSri,
  DocumentStepTypes.EcuadorianRegistroCivil,
  DocumentStepTypes.GuatemalanTse,
  DocumentStepTypes.HonduranRnp,
  DocumentStepTypes.ParaguayanRcp,
  DocumentStepTypes.PanamenianTribunalElectoral,
  DocumentStepTypes.DominicanJce,
  DocumentStepTypes.PeruvianReniec,
  DocumentStepTypes.CostaRicanAtv,
  DocumentStepTypes.CostaRicanTse,
  DocumentStepTypes.SalvadorianTse,
  DocumentStepTypes.VenezuelanCne,
  DocumentStepTypes.CostaRicanSocialSecurity,
];

export const StepStatus = {
  Success: 'success',
  Failure: 'failure',
  Incomplete: 'incomplete',
  Checking: 'checking',
};

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
  [DocumentStepTypes.DuplicateUserDetectionCheck]: ['duplacateIdentityDetection.notValidParams'],
  [DocumentStepTypes.HonduranRnp]: ['honduranRnp.notEnoughParams'],
  [DocumentStepTypes.PremiumAmlWatchlistsCheck]: ['premiumAmlWatchlists.notValidParams'],
  [DocumentStepTypes.ParaguayanRcp]: ['paraguayanRcp.notEnoughParams'],
  [DocumentStepTypes.Watchlists]: ['watchlists.notEnoughParams'],
  [DocumentStepTypes.ArgentinianDni]: ['argentinianDni.notEnoughParams'],
  [DocumentStepTypes.CostaRicanAtv]: ['costaRicanAtv.notEnoughParams'],
  [DocumentStepTypes.BolivianOep]: ['bolivianOep.notEnoughParams'],
  [DocumentStepTypes.ChileanRegistroCivil]: ['chileanRegistroCivil.notEnoughParams'],
  [DocumentStepTypes.ColombianProcuraduria]: ['colombianProcuraduria.notEnoughParams'],
  [DocumentStepTypes.CostaRicanTse]: ['costaRicanTse.notEnoughParams'],
  [DocumentStepTypes.EcuadorianSri]: ['ecuadorianSri.notEnoughParams'],
  [DocumentStepTypes.EcuadorianRegistroCivil]: ['ecuadorianRegistroCivil.notEnoughParams'],
  [DocumentStepTypes.GuatemalanTse]: ['guatemalanTse.notEnoughParams'],
  [DocumentStepTypes.SalvadorianTse]: ['salvadorianTse.notEnoughParams'],
  [DocumentStepTypes.ColombianNationalPolice]: ['colombianNationPolice.notEnoughParams'],
  [DocumentStepTypes.CostaRicanSocialSecurity]: ['costaRicanSocialSecurity.notEnoughParams'],
  [DocumentStepTypes.PanamenianTribunalElectoral]: ['panamenianTribunalElectoral.notEnoughParams'],
  [DocumentStepTypes.DominicanJce]: ['dominicanJce.notEnoughParams'],
  [DocumentStepTypes.VenezuelanCne]: ['venezuelanCne.notEnoughParams'],
  [StepTypes.PhoneOwnership]: ['phoneOwnership.notEnoughParams', 'phoneOwnership.skipped'],
  [StepTypes.PhoneRiskValidation]: ['phoneRisk.skipped'],
  [StepTypes.EmailOwnership]: ['emailOwnership.notEnoughParams', 'emailOwnership.skipped'],
  [StepTypes.EmailRisk]: ['emailRisk.notEnoughParams', 'emailRisk.skipped'],
};

export const LEGACY_ERROR = 'LegacyError';
export const FRONTEND_ERROR = 'FrontendError';
export const SYSTEM_ERROR = 'SystemError';

function getAltered(step, identity, countries, document) {
  switch (step.id) {
    case DocumentStepTypes.AlternationDetection:
      return getAlterationReason(step);
    case DocumentStepTypes.FaceMatch: {
      const steps = get(identity, '_embedded.verification.steps') || [];
      const pooStep = steps.find((item) => item.id === StepTypes.ProofOfOwnership);
      return getFacematchStepExtra(step, pooStep, identity, document);
    }
    case DocumentStepTypes.TemplateMatching:
      return getTemplateMatchingStepExtraData(step, identity, countries, document);
    case DocumentStepTypes.PremiumAmlWatchlistsCheck:
      return getPremiumAmlWatchlistsCheckExtraData(step, document, identity);
    default:
      return step;
  }
}

export function getDocumentStep(id, steps = []) {
  return steps.find((step) => step.id === id) || {};
}

// interface example
// const stepExample = {
//   error: {
//     type: 'LegacyError',
//     code: 'legacy.error',
//     message: 'Document is considered tampered',
//   },
//   id: 'alteration-detection',
//   status: 200,
//   // for reading
//   data: {
//     dateOfBirth: { required: true, label: 'Day of Birth', format: 'date', value: null },
//     documentNumber: { required: true, label: 'Document Number', value: null },
//     expirationDate: { label: 'Date of Expiration', format: 'date', value: null },
//     fullName: { required: true, label: 'Name', value: null },
//   },
//   // extra
//   checkStatus: StepStatus.Failure,
// };

export function getStepStatus({ id, status, error }) {
  if (status !== 200) {
    return StepStatus.Checking;
  }

  if (!error) {
    return StepStatus.Success;
  }

  const code = get(error, 'code');

  return code && StepIncompletionErrors[id] && StepIncompletionErrors[id].includes(code)
    ? StepStatus.Incomplete
    : StepStatus.Failure;
}

export function getStepExtra(step, identity, countries, document) {
  if (!step) {
    return step;
  }

  const altered = getAltered(step, identity, countries, document);

  return {
    ...altered,
    checkStatus: getStepStatus(step),
    // extras (DocumentStepFrontendChecksTypes) and Gov-checks has no tip
    isTip: Object.values(DocumentStepTypes).includes(step.id) && !CountrySpecificChecks.includes(step.id),
  };
}

export function getReaderFrontendSteps(readerStep) {
  const steps = [];
  const fields = getFieldsExtra(readerStep.data);
  const emptyFields = fields.filter((item) => !item.value);
  const isCovid = isCovidTolerance(document.fields?.expirationDate?.value, document.country);

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

export function getComputedSteps(readerStep, identity, document) {
  const steps = [];
  const isDocumentExpired = identity?.computed?.isDocumentExpired?.data?.[document?.type];
  const isUndetermined = isEmpty(isDocumentExpired);
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

export function getStepsExtra(steps = [], identity, countries, document) {
  const readerStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);

  return [
    ...getReaderFrontendSteps(readerStep),
    ...getComputedSteps(readerStep, identity, document),
    ...steps,
  ].map((item) => getStepExtra(item, identity, countries, document));
}
