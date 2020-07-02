import { get } from 'lodash';
import { getCheckFieldsExtra, getFieldsExtra } from 'models/Field.model';
import { getSecurityChecksExtra } from 'models/SecurityCheck.model';
import { DocumentSecuritySteps, DocumentStepTypes, getDocumentStep, getStepsExtra } from 'models/Step.model';

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
    const steps = getStepsExtra(document.steps, identity);
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
      curp: getCheckFieldsExtra(curp.data),
      ine: getCheckFieldsExtra(ine.data),
      rfc: getCheckFieldsExtra(rfc.data),
      checks: getSecurityChecksExtra(steps.filter((step) => DocumentSecuritySteps.includes(step.id))),
      isSanctioned: DocumentCountrySanctionList.includes(document.country),
    };
  });
}
