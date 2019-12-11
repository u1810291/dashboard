import React from 'react';
import { useIntl } from 'react-intl';
import { getStepStatus } from 'models/Step.model';
import {
  Grid,
  Typography,
} from '@material-ui/core';

export function CheckListFlat({ step: { id, error, status } }) {
  const intl = useIntl();

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
        <Typography color={error ? 'error' : 'textSecondary'}>
          {intl.formatMessage({
            id: `SecurityCheckStep.${id}.${getStepStatus(status, error)}`,
          })}
        </Typography>
      </Grid>
    </Grid>
  );
}
