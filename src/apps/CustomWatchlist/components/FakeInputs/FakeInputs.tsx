import { Grid, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './FakeInputs.styles';

export function FakeInput({ label, value }: { label: string; value: string }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" alignItems="center" direction="row" className={classes.input}>
      <Grid item><Typography variant="subtitle2">{label}</Typography></Grid>
      <Grid item><Typography variant="subtitle2" className={classes.colorBlue}>{value}</Typography></Grid>
    </Grid>
  );
}

export function FakeInputs() {
  const intl = useIntl();

  const fakeInputsFields = useMemo(() => [
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.name' }),
      value: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.name.title' }),
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.date' }),
      value: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.date.formating' }),
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.countryCode' }),
      value: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.countryCode.code' }),
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.phone' }),
      value: '12345678',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.fakeInputs.email' }),
      value: 'email@email.com',
    },
  ], [intl]);

  return (
    <Grid container direction="column" spacing={1}>
      {fakeInputsFields.map((input) => <Grid key={input.value} item><FakeInput label={input.label} value={input.value} /></Grid>)}
    </Grid>
  );
}
