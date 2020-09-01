import { getFacematchStepExtra } from 'apps/facematch/models/facematch.model';
import { getAlterationReason } from 'apps/alterationDetection/models/alterationDetection.model';
import { get } from 'lodash';
import { getFieldsExpired, getFieldsExtra } from 'models/Field.model';

export const DocumentStepTypes = {
  DocumentReading: 'document-reading',
  AlternationDetection: 'alteration-detection',
  Watchlists: 'watchlists',
  FaceMatch: 'facematch',
  TemplateMatching: 'template-matching',
  CURP: 'mexican-curp-validation',
  INE: 'mexican-ine-validation',
  RFC: 'mexican-rfc-validation',
  ColombianRegistraduria: 'colombian-registraduria-validation',
  ArgentinianRenaper: 'argentinian-renaper-validation',
};

// used as 'id' of failed steps in check summary
export const DocumentStepFailedTypes = {
  ExpiredDate: 'expired-date',
  EmptyFields: 'empty-fields',
};

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
  DocumentStepTypes.ColombianRegistraduria,
  DocumentStepTypes.ArgentinianRenaper,
];

export const StepStatus = {
  Success: 'success',
  Failure: 'failure',
  Incomplete: 'incomplete',
  Checking: 'checking',
};

const StepIncompletionErrors = {
  [DocumentStepTypes.Watchlists]: ['watchlists.notEnoughParams'],
};

export const LEGACY_ERROR = 'LegacyError';
export const FRONTEND_ERROR = 'FrontendError';
export const SYSTEM_ERROR = 'SystemError';

function getAltered(step) {
  switch (step.id) {
    case DocumentStepTypes.AlternationDetection:
      return getAlterationReason(step);
    case DocumentStepTypes.FaceMatch:
      return getFacematchStepExtra(step);
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

export function getStepExtra(step) {
  const altered = getAltered(step);

  return {
    ...altered,
    checkStatus: getStepStatus(step),
    // extras (DocumentStepFailedTypes) and Gov-checks has no tip
    isTip: Object.values(DocumentStepTypes).includes(step.id) && !CountrySpecificChecks.includes(step.id),
  };
}

export function getReaderFailedSteps(readerStep, config = {}, identity) {
  const steps = [];
  const fields = getFieldsExtra(readerStep.data);
  const emptyFields = fields.filter((item) => !item.value);
  const expiredFields = getFieldsExpired(fields, config[DocumentStepFailedTypes.ExpiredDate], identity);

  if (emptyFields.length > 0) {
    steps.push({
      ...readerStep,
      id: DocumentStepFailedTypes.EmptyFields,
      error: {
        type: FRONTEND_ERROR,
        code: DocumentStepFailedTypes.EmptyFields,
      },
      labelStatusDataIntl: {
        fields: emptyFields.map((item) => `identity.field.${item.id}`),
      },
    });
  }

  if (expiredFields.length > 0) {
    steps.push({
      ...readerStep,
      id: DocumentStepFailedTypes.ExpiredDate,
      error: {
        type: FRONTEND_ERROR,
        code: DocumentStepFailedTypes.ExpiredDate,
      },
      labelStatusData: {
        date: expiredFields.map((item) => item.value).join(', '),
      },
    });
  }

  return steps;
}

export function getStepsExtra(steps = [], config, identity) {
  const readerStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);
  return [
    ...getReaderFailedSteps(readerStep, config, identity),
    ...steps,
  ].map((item) => getStepExtra(item));
}
