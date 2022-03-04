import { StepStatus, isSecondaryGovCheckError, IStep } from 'models/Step.model';
import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { govCheckDisplayOptions } from 'apps/GovCheck/models/GovCheck.model';
import { useIntl } from 'react-intl';
import has from 'lodash/has';
import { CheckStepDetailsEntry } from '../CheckStepDetails/CheckStepDetailsEntry';
import { useStyles } from './GovCheckText.styles';

export function GovCheckText({ step }: {step: IStep}) {
  const intl = useIntl();
  const classes = useStyles();
  const { error, checkStatus: status, id } = step;
  let data = { ...step.data };
  let stepDataEntries = [];

  if (step.data) {
    const displayOption = (step.data.subStepId ? govCheckDisplayOptions[step.id][step.data.subStepId] : govCheckDisplayOptions[step.id]) || {};
    stepDataEntries = Object.keys(displayOption).map((entry) => {
      if (displayOption[entry]?.formatter) {
        data = displayOption[entry].formatter(data[entry], data);
      }
      const value = data[entry];
      const dependentFieldForFailedCheck = data[displayOption[entry]?.dependentFieldForFailedCheck];
      delete data[entry];
      if (displayOption[entry].hidden || (displayOption[entry].hiddenIfNotExists && !value)) {
        return null;
      }
      if (has(displayOption[entry], 'hideIsField') && displayOption[entry].hideIsField === step.data[displayOption[entry].filedCondition]) {
        return null;
      }
      return (
        <Grid xs={displayOption[entry].inline ? 6 : 12} item>
          <CheckStepDetailsEntry
            label={entry}
            value={value || '—'}
            key={entry}
            isCentered={displayOption[entry].isCentered}
            isMarkedAsFailed={!!displayOption[entry].dependentFieldForFailedCheck && dependentFieldForFailedCheck !== true}
          />
        </Grid>
      );
    });
    stepDataEntries = stepDataEntries.concat(Object.entries(data).map(([key, value]) => <CheckStepDetailsEntry label={key} value={value} key={key} />));
  }

  if (status === StepStatus.Success) {
    return (
      <Grid container>
        {stepDataEntries}
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
              {stepDataEntries}
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
