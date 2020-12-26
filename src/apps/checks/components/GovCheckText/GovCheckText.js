import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from '../CheckStepDetails/CheckStepDetailsEntry';

export function GovCheckText({ step }) {
  const intl = useIntl();
  const { error, checkStatus: status } = step;

  if (status === StepStatus.Success) {
    return Object.entries(step.data || {}).map(([key, value]) => <CheckStepDetailsEntry label={key} value={value} key={key} />);
  }

  if (error) {
    return intl.formatMessage({
      id: `SecurityCheckStep.${error.code}.message`,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` }),
    });
  }

  return intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` });
}
