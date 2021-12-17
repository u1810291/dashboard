import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './FakeInputs.styles';
import { ValidatedInputsKeys } from '../../models/CustomWatchlist.models';

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
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.Country}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.Country}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DocumentNumber}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.DocumentNumber}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DocumentType}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.DocumentType}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.EmailAddress}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.EmailAddress}.value` })}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.PhoneNumber}.label` })}
          value={intl.formatMessage({ id: `CustomWatchlist.settings.modal.fakeInputs.${ValidatedInputsKeys.PhoneNumber}.value` })}
        />
      </Grid>
    </Grid>
  );
}
