import { useIntl } from 'react-intl';
import { DocumentMxSteps } from '../../../models/Step.model';

export function useStatusLabel(step) {
  const intl = useIntl();

  if (DocumentMxSteps.includes(step.id)) {
    return intl.formatMessage({ id: `SecurityCheckStep.${step.error.code}` });
  }

  let { labelStatusData } = step;

  if (step.labelStatusDataIntl) {
    labelStatusData = {};
    Object.keys(step.labelStatusDataIntl).forEach((key) => {
      const value = step.labelStatusDataIntl[key];
      if (Array.isArray(value)) {
        labelStatusData[key] = value.map((id) => intl.formatMessage({ id })).join(', ');
      } else {
        labelStatusData[key] = intl.formatMessage({ id: value });
      }
    });
  }

  return intl.formatMessage({ id: `SecurityCheckStep.${step.id}.${step.checkStatus}`, defaultMessage: ' ' }, labelStatusData);
}
