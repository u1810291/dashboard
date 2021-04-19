import { getAlterationReason } from 'apps/alterationDetection/models/alterationDetection.model';
import { getFacematchStepExtra } from 'apps/facematch/models/facematch.model';
import { getPremiumAmlWatchlistsCheckExtraData } from 'apps/premiumAmlWatchlistsIntegratedCheck/models/premiumAmlWatchlistsIntegratedCheck.model';
import { getTemplateMatchingStepExtraData } from 'apps/templateMatching/models/templateMatching.model';
import { get } from 'lodash';
import { getFieldsExpired, getFieldsExtra } from 'models/Field.model';

export const StepTypes = {
  ProofOfOwnership: 'proof-of-ownership',
  LivenessMovement: 'liveness',
  Selfie: 'selfie',
  // TODO @dkchv: wtf?
  Voice: 'voice',
  LivenessVoice: 'voice+liveness',
};

export const VerificationPatternTypes = {
  AgeValidation: 'age-check',
  BolivianOep: 'bolivian-oep-validation',
  ChileanRegistroCivil: 'chilean-registro-civil-validation',
  ColombianRegistraduria: 'colombian-registraduria-validation',
  CostaRicanTse: 'costa-rican-tse-validation',
  ArgentinianDni: 'argentinian-dni-validation',
  ArgentinianRenaper: 'argentinian-renaper-validation',
  EcuadorianRegistroCivil: 'ecuadorian-registro-civil-validation',
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
  PremiumAmlWatchlistsCheck: 'premium-aml-watchlists-search-validation',
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
  ColombianRegistraduria: VerificationPatternTypes.ColombianRegistraduria,
  ArgentinianRenaper: VerificationPatternTypes.ArgentinianRenaper,
  EcuadorianRegistroCivil: VerificationPatternTypes.EcuadorianRegistroCivil,
  ParaguayanRcp: VerificationPatternTypes.ParaguayanRcp,
  PeruvianReniec: VerificationPatternTypes.PeruvianReniec,
  CostaRicanTse: VerificationPatternTypes.CostaRicanTse,
  ArgentinianDni: VerificationPatternTypes.ArgentinianDni,
  SalvadorianTse: VerificationPatternTypes.SalvadorianTse,
  DuplicateUserDetectionCheck: 'duplicate-user-detection',
  HonduranRnp: VerificationPatternTypes.HonduranRnp,
  PremiumAmlWatchlistsCheck: 'premium-aml-watchlists-search-validation',
  PanamenianTribunalElectoral: 'panamenian-tribunal-electoral-validation',
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
  DocumentStepTypes.ColombianRegistraduria,
  DocumentStepTypes.EcuadorianRegistroCivil,
  DocumentStepTypes.HonduranRnp,
  DocumentStepTypes.ParaguayanRcp,
  DocumentStepTypes.PanamenianTribunalElectoral,
  DocumentStepTypes.PeruvianReniec,
  DocumentStepTypes.CostaRicanTse,
  DocumentStepTypes.SalvadorianTse,
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
  [DocumentStepTypes.BolivianOep]: ['bolivianOep.notEnoughParams'],
  [DocumentStepTypes.ChileanRegistroCivil]: ['chileanRegistroCivil.notEnoughParams'],
  [DocumentStepTypes.CostaRicanTse]: ['costaRicanTse.notEnoughParams'],
  [DocumentStepTypes.EcuadorianRegistroCivil]: ['ecuadorianRegistroCivil.notEnoughParams'],
  [DocumentStepTypes.SalvadorianTse]: ['salvadorianTse.notEnoughParams'],
  [DocumentStepTypes.AgeValidation]: ['underage.noDOB'],
  [DocumentStepTypes.PanamenianTribunalElectoral]: ['panamenianTribunalElectoral.notEnoughParams'],
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

export function getReaderFrontendSteps(readerStep, config = {}, identity, document) {
  const steps = [];
  const fields = getFieldsExtra(readerStep.data).map((field) => {
    const transforms = config.transforms && config.transforms[field.id];
    if (!transforms) {
      return field;
    }
    const transformedValue = transforms.reduce((currentValue, transform) => transform(currentValue, document), field.value);
    return {
      ...field,
      value: transformedValue,
    };
  });
  const emptyFields = fields.filter((item) => !item.value);
  const expiredFields = getFieldsExpired(fields, config[DocumentStepFrontendChecksTypes.ExpiredDate], identity.dateCreated);
  /* TODO @ggrigorev there was a bug in the function for several months. Research why nothing was broken
  const expiredFields = getFieldsExpired(fields, config[DocumentStepFrontendChecksTypes.ExpiredDate], identity);
   */

  steps.push({
    ...readerStep,
    id: DocumentStepFrontendChecksTypes.EmptyFields,
    error: fields.length === 0 || emptyFields.length > 0 ? {
      type: FRONTEND_ERROR,
      code: DocumentStepFrontendChecksTypes.EmptyFields,
    } : null,
    labelStatusDataIntl: {
      fields: emptyFields.map((item) => `identity.field.${item.id}`),
    },
  });

  steps.push({
    ...readerStep,
    id: DocumentStepFrontendChecksTypes.ExpiredDate,
    error: expiredFields.length > 0 ? {
      type: FRONTEND_ERROR,
      code: DocumentStepFrontendChecksTypes.ExpiredDate,
    } : null,
    labelStatusData: {
      date: expiredFields.map((item) => item.value).join(', '),
    },
  });

  return steps;
}

export function getStepsExtra(steps = [], config, identity, countries, document) {
  const readerStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);
  return [
    ...getReaderFrontendSteps(readerStep, config, identity, document),
    ...steps,
  ].map((item) => getStepExtra(item, identity, countries, document));
}
