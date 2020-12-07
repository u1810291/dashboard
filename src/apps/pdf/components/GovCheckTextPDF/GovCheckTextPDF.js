import React from 'react';
import { useIntl } from 'react-intl';
import { Text } from '@react-pdf/renderer';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';
import { commonStyles } from '../../PDF.styles';
import { StepStatus } from '../../../../models/Step.model';

export function GovCheckTextPDF({ step }) {
  const intl = useIntl();
  const { error, checkStatus: status } = step;

  if (status === StepStatus.Success) {
    return Object.entries(step.data || {}).map(([key, value]) => <CheckStepDetailsEntryPDF label={key} value={value} key={key} />);
  }

  return (
    <Text style={commonStyles.title}>
      {error
        ? intl.formatMessage({
          id: `SecurityCheckStep.${error.code}.message`,
          defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` }),
        })
        : intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` })}
    </Text>
  );
}
