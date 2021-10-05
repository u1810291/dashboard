import { Grid, Typography } from '@material-ui/core';
import { ValidatedInputsKeys } from 'models/CustomWatchlist.model';
import React from 'react';
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
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.FullName}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.FullName}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DateOfBirth}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.DateOfBirth}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.CountryCode}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.CountryCode}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.PassportNumber}.label` })}
          value="12345678"
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.NationalId}.label` })}
          value="12345678"
        />
      </Grid>
    </Grid>
  );
}
