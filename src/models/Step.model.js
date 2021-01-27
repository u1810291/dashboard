import { getFacematchStepExtra } from 'apps/facematch/models/facematch.model';
import { getAlterationReason } from 'apps/alterationDetection/models/alterationDetection.model';
import { getTemplateMatchingStepExtraData } from 'apps/templateMatching/models/templateMatching.model';
import { getComplyAdvantageIntegratedCheckExtraData } from 'apps/complyAdvantageIntegratedCheck/models/complyAdvantageIntegratedCheck.model';
import { get } from 'lodash';
import { getFieldsExpired, getFieldsExtra } from 'models/Field.model';

export const DocumentStepTypes = {
  AgeValidation: 'age-check',
  DocumentReading: 'document-reading',
  AlternationDetection: 'alteration-detection',
  Watchlists: 'watchlists',
  FaceMatch: 'facematch',
  TemplateMatching: 'template-matching',
  CURP: 'mexican-curp-validation',
  INE: 'mexican-ine-validation',
  RFC: 'mexican-rfc-validation',
  BrazilianDatavalid: 'brazilian-datavalid-validation',
  ColombianRegistraduria: 'colombian-registraduria-validation',
  ArgentinianRenaper: 'argentinian-renaper-validation',
  PeruvianReniec: 'peruvian-reniec-validation',
  DuplicateUserDetectionCheck: 'duplicate-user-detection',
  ComplyAdvantageIntegratedCheck: 'premium-aml-watchlists-search',
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
  DocumentStepTypes.ArgentinianRenaper,
  DocumentStepTypes.BrazilianDatavalid,
  DocumentStepTypes.ColombianRegistraduria,
  DocumentStepTypes.PeruvianReniec,
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
  [DocumentStepTypes.Watchlists]: ['watchlists.notEnoughParams'],
  [DocumentStepTypes.DuplicateUserDetectionCheck]: ['duplacateIdentityDetection.notValidParams'],
  [DocumentStepTypes.ComplyAdvantageIntegratedCheck]: ['complyAdvantage.notValidParams'],
  [DocumentStepTypes.AgeValidation]: ['underage.noDOB'],
};

export const LEGACY_ERROR = 'LegacyError';
export const FRONTEND_ERROR = 'FrontendError';
export const SYSTEM_ERROR = 'SystemError';

function getAltered(step, identity, countries, document) {
  switch (step.id) {
    case DocumentStepTypes.AlternationDetection:
      return getAlterationReason(step);
    case DocumentStepTypes.FaceMatch:
      return getFacematchStepExtra(step, identity);
    case DocumentStepTypes.TemplateMatching:
      return getTemplateMatchingStepExtraData(step, identity, countries, document);
    case DocumentStepTypes.ComplyAdvantageIntegratedCheck:
      return getComplyAdvantageIntegratedCheckExtraData(step, document);
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
  const altered = getAltered(step, identity, countries, document);

  return {
    ...altered,
    checkStatus: getStepStatus(step),
    // extras (DocumentStepFrontendChecksTypes) and Gov-checks has no tip
    isTip: Object.values(DocumentStepTypes).includes(step.id) && !CountrySpecificChecks.includes(step.id),
  };
}

export function getReaderFrontendSteps(readerStep, config = {}, identity) {
  const steps = [];
  const fields = getFieldsExtra(readerStep.data);
  const emptyFields = fields.filter((item) => !item.value);
  const expiredFields = getFieldsExpired(fields, config[DocumentStepFrontendChecksTypes.ExpiredDate], identity);

  steps.push({
    ...readerStep,
    id: DocumentStepFrontendChecksTypes.EmptyFields,
    error: emptyFields.length > 0 ? {
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
    ...getReaderFrontendSteps(readerStep, config, identity),
    ...steps,
  ].map((item) => getStepExtra(item, identity, countries, document));
}
