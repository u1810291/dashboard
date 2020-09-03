import React from 'react';
import { Grid } from '@material-ui/core';
import { useFormattedValue } from 'lib/string';
import { useIntl } from 'react-intl';
import { useStyles } from './CheckStepDetails.styles';

export function CheckStepDetailsEntry({ label, value }) {
  const classes = useStyles();
  const intl = useIntl();
  const formatted = useFormattedValue(label, value);

  return (
    <Grid container item spacing={1} key={label}>
      <Grid item xs={3} className={classes.label}>
        {intl.formatMessage({
          id: `identity.field.${label}`,
          defaultMessage: label,
        })}
      </Grid>
      <Grid item xs={3} className={classes.value}>
        {formatted}
      </Grid>
    </Grid>
  );
}
