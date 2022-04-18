import React from 'react';
import { useFormatMessage } from 'apps/intl';
import Grid from '@material-ui/core/Grid';
import { FormCsvSeparatorSelect } from '../FormCsvSeparatorSelect/FormCsvSeparatorSelect';
import { useStyles } from './FormCsvSeparator.styles';

export function FormCsvSeparator({ name, error }: {
  name?: string;
  error?: string;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Grid container alignItems="center" justifyContent="space-between" className={classes.marginTop20}>
      <Grid item className={classes.title}>{formatMessage('Watchlist.settings.modal.select.csvSeparator.title')}</Grid>
      <Grid item className={classes.selectWrap}>
        <FormCsvSeparatorSelect name={name} />
      </Grid>
      {error && <span className={classes.red}>{error}</span>}
    </Grid>
  );
}
