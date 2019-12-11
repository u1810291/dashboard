import React from 'react';
import { useIntl } from 'react-intl';
import { getStepStatus } from 'models/Step.model';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const colors = {
  failure: 'error',
  success: 'textSecondary',
  checking: 'textPrimary',
};

export function CheckListFlat({ step: { id, error, status } }) {
  const intl = useIntl();
  const checkStatus = getStepStatus(status, error);

  return (
    <Grid
      container
      spacing={3}
      key={id}
      wrap="nowrap"
    >
      <Grid item xs={3}>
        {intl.formatMessage({ id: `SecurityCheckStep.${id}.title` })}
      </Grid>
      <Grid item xs={9}>
        <Typography color={colors[checkStatus]}>
          {intl.formatMessage({
            id: `SecurityCheckStep.${id}.${checkStatus}`,
          })}
        </Typography>
      </Grid>
    </Grid>
  );
}
