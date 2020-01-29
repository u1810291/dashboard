import { fromPairs, toPairs } from 'lodash';
import { DocumentStepTypes } from 'models/Document.model';

// FOR GOVCHECK DATA:
// turns `data: {key: value, ...}` to `data: {key: {value: value}, ...}`
// as we already have for document reading step
export function normalizeCURPData(identity) {
  if (!identity._embedded || !identity._embedded.verification) return identity;
  return {
    ...identity,
    _embedded: {
      ...identity._embedded,
      verification: {
        ...identity._embedded.verification,
        documents: identity._embedded.verification.documents.map((doc) => ({
          ...doc,
          steps: doc.steps.map((step) => ({
            ...step,
            data:
              step.data && [DocumentStepTypes.CURP, DocumentStepTypes.INE].includes(step.id)
                ? fromPairs(toPairs(step.data).map(([key, value]) => [key, { value }]))
                : step.data,
          })),
        })),
      },
    },
  };
}
