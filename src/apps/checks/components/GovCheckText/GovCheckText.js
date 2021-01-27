import { StepStatus } from 'models/Step.model';
import React from 'react';
import { Grid } from '@material-ui/core';
import { govCheckDisplayOptions } from 'apps/GovCheck/models/GovCheck.model';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from '../CheckStepDetails/CheckStepDetailsEntry';

export function GovCheckText({ step }) {
  const intl = useIntl();
  const { error, checkStatus: status } = step;

  if (status === StepStatus.Success) {
    const displayOption = govCheckDisplayOptions[step.id] || {};
    const data = { ...step.data };
    const result = Object.keys(displayOption).map((entry) => {
      delete data[entry];
      return (
        <Grid xs={displayOption[entry].inline ? 6 : 12} item>
          <CheckStepDetailsEntry label={entry} value={step.data[entry] !== null ? step.data[entry] : 'Null'} key={entry} />
        </Grid>
      );
    });
    return (
      <Grid container>
        {result.concat(Object.entries(data).map(([key, value]) => <CheckStepDetailsEntry label={key} value={value} key={key} />))}
      </Grid>
    );
  }

  if (error) {
    return intl.formatMessage({
      id: `SecurityCheckStep.${error.code}.message`,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` }),
    });
  }

  return intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` });
}
