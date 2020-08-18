import { get } from 'lodash';
import { FieldsEmissionCheck, FieldsExpirationCheck, getCheckFieldsExtra, getFieldsExtra } from './Field.model';
import { DocumentSecuritySteps, DocumentStepFailedTypes, DocumentStepTypes, getDocumentStep, getStepsExtra } from './Step.model';

export const DocumentTypes = {
  Passport: 'passport',
  NationalId: 'national-id',
  DrivingLicense: 'driving-license',
  ProofOfResidency: 'proof-of-residency',
};

export const DocumentConfig = {
  [DocumentTypes.Passport]: {
    [DocumentStepFailedTypes.ExpiredDate]: [FieldsExpirationCheck],
  },
  [DocumentTypes.NationalId]: {
    [DocumentStepFailedTypes.ExpiredDate]: [FieldsExpirationCheck],
  },
  [DocumentTypes.DrivingLicense]: {
    [DocumentStepFailedTypes.ExpiredDate]: [FieldsExpirationCheck],
  },
  [DocumentTypes.ProofOfResidency]: {
    [DocumentStepFailedTypes.ExpiredDate]: [FieldsEmissionCheck],
  },
};

export const DocumentCountrySanctionList = [
  'AF',
  'BY',
  'BI',
  'CF',
  'CI',
  'CU',
  'CD',
  'CY',
  'ER',
  'FJ',
  'GQ',
  'HT',
  'KG',
  'IR',
  'IQ',
  'LA',
  'LB',
  'LK',
  'LY',
  'ML',
  'MR',
  'NI',
  'KP',
  'PG',
  'PS',
  'RW',
  'SO',
  'SD',
  'SY',
  'UA',
  'RU',
  'TM',
  'YE',
  'VE',
  'ZW',
];

export function getDocumentExtras(identity) {
  const documents = get(identity, '_embedded.verification.documents') || [];
  const source = get(identity, '_embedded.documents');

  return documents.map((document) => {
    const steps = getStepsExtra(document.steps, DocumentConfig[document.type], identity);
    const colombianRegistraduria = getDocumentStep(DocumentStepTypes.ColombianRegistraduria, steps);
    const curp = getDocumentStep(DocumentStepTypes.CURP, steps);
    const ine = getDocumentStep(DocumentStepTypes.INE, steps);
    const rfc = getDocumentStep(DocumentStepTypes.RFC, steps);
    const sourceDocument = source.find((item) => item.type === document.type) || {};

    return {
      ...document,
      steps,
      source: sourceDocument,
      photos: document.photos || [],
      reading: getFieldsExtra(sourceDocument.fields),
      colombianRegistraduria: getCheckFieldsExtra(colombianRegistraduria.data),
      curp: getCheckFieldsExtra(curp.data),
      ine: getCheckFieldsExtra(ine.data),
      rfc: getCheckFieldsExtra(rfc.data),
      checks: steps.filter((step) => DocumentSecuritySteps.includes(step.id)),
      isSanctioned: DocumentCountrySanctionList.includes(document.country),
    };
  });
}

export function getDocumentList() {
  return Object.values(DocumentTypes);
}
