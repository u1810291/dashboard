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
};

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
    const sourceDocument = source.find((item) => item.type === document.type);

    return {
      reading: getFieldsExtra(sourceDocument.fields),
      curp: getFieldsExtra(curp.data),
      ine: getFieldsExtra(ine.data),
      checks: getSecurityChecksExtra(steps.filter((step) => DocumentSecuritySteps.includes(step.id))),
      type: document.type,
      country: document.country,
      region: document.region,
      photos: document.photos || [],
    };
  });
}
