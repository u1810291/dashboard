import { getFacematchStepExtra } from 'apps/facematch/models/facematch.model';
import { isDateExpired } from 'lib/date';
import { FieldsExpiredCheck, getFieldsExtra } from 'models/Field.model';

export const DocumentStepTypes = {
  DocumentReading: 'document-reading',
  AlternationDetection: 'alteration-detection',
  Watchlists: 'watchlists',
  FaceMatch: 'facematch',
  TemplateMatching: 'template-matching',
  CURP: 'mexican-curp-validation',
  INE: 'mexican-ine-validation',
  RFC: 'mexican-rfc-validation',
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

export const StepStatus = {
  Success: 'success',
  Failure: 'failure',
  Checking: 'checking',
};

export const LEGACY_ERROR = 'LegacyError';
export const STEP_ERROR = 'StepError';
export const SYSTEM_ERROR = 'SystemError';

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

export function getStepStatus(status, error) {
  if (status === 200) {
    return error
      ? StepStatus.Failure
      : StepStatus.Success;
  }
  return StepStatus.Checking;
}

export function getStepExtra(step, identity) {
  const altered = step.id === DocumentStepTypes.FaceMatch
    ? getFacematchStepExtra(step, identity)
    : step;

  return {
    ...altered,
    checkStatus: getStepStatus(step.status, step.error),
    // extras (DocumentStepFailedTypes) and Gov-checks has no tip
    isTip: Object.values(DocumentStepTypes).includes(step.id) && !DocumentMxSteps.includes(step.id),
  };
}

export function getReaderFailedSteps(readerStep, identity) {
  const steps = [];
  const fields = getFieldsExtra(readerStep.data);
  const emptyFields = fields.filter((item) => !item.value);
  const expiredFields = fields.filter((item) => FieldsExpiredCheck.includes(item.id) && isDateExpired(item.value, identity.dateCreated));

  if (emptyFields.length > 0) {
    steps.push({
      ...readerStep,
      id: DocumentStepFailedTypes.EmptyFields,
      error: true,
      labelStatusData: {
        // TODO @dkchv: add i18n
        fields: emptyFields.map((item) => item.label).join(', '),
      },
    });
  }

  if (expiredFields.length > 0) {
    steps.push({
      ...readerStep,
      id: DocumentStepFailedTypes.ExpiredDate,
      error: true,
      labelStatusData: {
        date: expiredFields.map((item) => item.value).join(', '),
      },
    });
  }

  return steps;
}

export function getStepsExtra(steps = [], identity) {
  const readerStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);
  return [
    ...getReaderFailedSteps(readerStep, identity),
    ...steps,
  ].map((item) => getStepExtra(item, identity));
}
