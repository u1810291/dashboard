import React from 'react';
import { useIntl } from 'react-intl';
import { getStepStatus } from 'models/Step.model';
import { Grid } from '@material-ui/core';
import { useStyles } from './StatusMessage.styles';

export function CheckListFlat({ step: { id, error, status } }) {
  const intl = useIntl();
  const classes = useStyles();
  const checkStatus = getStepStatus(status, error);

  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={3}>
        {intl.formatMessage({ id: `SecurityCheckStep.${id}.title` })}
      </Grid>
      <Grid item xs={9} className={classes[checkStatus]}>
        {intl.formatMessage({ id: `SecurityCheckStep.${id}.${checkStatus}` })}
      </Grid>
    </Grid>
  );
}
