import { StepStatus, isSecondaryGovCheckError } from 'models/Step.model';
import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { govCheckDisplayOptions } from 'apps/GovCheck/models/GovCheck.model';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from '../CheckStepDetails/CheckStepDetailsEntry';
import { useStyles } from './GovCheckText.styles';

export function GovCheckText({ step }) {
  const intl = useIntl();
  const classes = useStyles();

  const { error, checkStatus: status, id } = step;
  const data = { ...step.data };

  if (status === StepStatus.Success) {
    const displayOption = govCheckDisplayOptions[step.id] || {};
    const result = Object.keys(displayOption).map((entry) => {
      delete data[entry];
      if (displayOption[entry].hidden) {
        return null;
      }
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
    const { code: errorCode } = error;

    if (data && isSecondaryGovCheckError(id, errorCode)) {
      return (
        <Box mt={1} className="error">
          <Box className={classes.labelError}>
            {intl.formatMessage({
              id: `SecurityCheckStep.${errorCode}.message`,
              defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` }),
            })}
          </Box>
          <Box mt={2}>
            <Grid container>
              {Object.entries(data).map(([key, value]) => (
                <Grid xs={6} item key={key}>
                  <CheckStepDetailsEntry label={key} value={value} key={key} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      );
    }
    return intl.formatMessage({
      id: `SecurityCheckStep.${errorCode}.message`,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` }),
    });
  }

  return intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` });
}
