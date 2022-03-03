import { StepStatus, isSecondaryGovCheckError } from 'models/Step.model';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './GovCheckText.styles';
import { useGovCheckData } from '../../hooks/useGovCheckData';
import { GovCheckIStep } from '../../models/GovCheck.model';

export function GovCheckText({ step, isShowError = true }: {
  step: GovCheckIStep;
  isShowError?: boolean;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  const { error, checkStatus: status, id } = step;
  const stepDataEntries = useGovCheckData(step, false);

  if (status === StepStatus.Success) {
    return (
      <Grid container>
        {stepDataEntries}
      </Grid>
    );
  }

  if (error) {
    const { code: errorCode } = error;

    if (stepDataEntries.length && isSecondaryGovCheckError(id, errorCode)) {
      return (
        <Box mt={isShowError ? 1 : 0} className={classNames({ error: isShowError })}>
          {isShowError && (
            <Box className={classes.labelError}>
              {formatMessage(`SecurityCheckStep.${errorCode}.message`, { defaultMessage: formatMessage(`SecurityCheckStep.govCheck.${status}`) })}
            </Box>
          )}
          <Box mt={isShowError ? 2 : 0}>
            <Grid container>
              {stepDataEntries}
            </Grid>
          </Box>
        </Box>
      );
    }
    return isShowError && (
      <>
          {formatMessage(`SecurityCheckStep.${errorCode}.message`, { defaultMessage: formatMessage(`SecurityCheckStep.govCheck.${status}`) })}
      </>
    );
  }
  return (
    <>
      {
        formatMessage(`SecurityCheckStep.govCheck.${status}`)
      }
    </>
  );
}
