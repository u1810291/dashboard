import { useIntl } from 'react-intl';
import { get } from 'lodash';
import { DocumentStepTypes, StepStatus } from 'models/Step.model';

export function CheckText({ step }) {
  const intl = useIntl();
  const extraData = step.labelExtraData || {};

  if ([DocumentStepTypes.AlternationDetection, DocumentStepTypes.ReFacematch].includes(step.id) && step.checkStatus === StepStatus.Failure) {
    const errorCode = get(step, 'error.code');

    return intl.formatMessage({
      id: errorCode ? `SecurityCheckStep.${errorCode}` : `SecurityCheckStep.${step.id}.${step.checkStatus}`,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
    });
  }

  if (step.labelExtra) {
    return intl.formatMessage({
      id: step.labelExtra,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
    }, step.labelExtraData);
  }

  return intl.formatMessage({
    id: `SecurityCheckStep.${step.id}.${step.checkStatus}`,
    defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
  }, extraData);
}
