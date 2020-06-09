import { get } from 'lodash';
import { getFieldsExtra } from 'models/Field.model';
import { getSecurityChecksExtra } from 'models/SecurityCheck.model';

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

export const DocumentSecuritySteps = [
  DocumentStepTypes.TemplateMatching,
  DocumentStepTypes.AlternationDetection,
  DocumentStepTypes.Watchlists,
  DocumentStepTypes.FaceMatch,
];

export function getDocumentExtras(identity) {
  const documents = get(identity, '_embedded.verification.documents') || [];
  const source = get(identity, '_embedded.documents');

  return documents.map((document) => {
    const steps = document.steps || [];
    const curp = steps.find((step) => step.id === DocumentStepTypes.CURP) || {};
    const ine = steps.find((step) => step.id === DocumentStepTypes.INE) || {};
    const rfc = steps.find((step) => step.id === DocumentStepTypes.RFC) || {};
    const sourceDocument = source.find((item) => item.type === document.type);

    return {
      reading: getFieldsExtra(sourceDocument.fields),
      curp: getFieldsExtra(curp.data),
      ine: getFieldsExtra(ine.data),
      rfc: getFieldsExtra(rfc.data),
      checks: getSecurityChecksExtra(steps.filter((step) => DocumentSecuritySteps.includes(step.id))),
      type: document.type,
      country: document.country,
      region: document.region,
      photos: document.photos || [],
      isSanctioned: DocumentCountrySanctionList.includes(document.country),
    };
  });
}
