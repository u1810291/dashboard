import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { ValidatedInputsKeys } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
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
  const formatMessage = useFormatMessage();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.FullName}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.FullName}.value`)}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.DateOfBirth}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.DateOfBirth}.value`)}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.Country}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.Country}.value`)}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.DocumentNumber}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.DocumentNumber}.value`)}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.DocumentType}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.DocumentType}.value`)}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.EmailAddress}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.EmailAddress}.value`)}
        />
      </Grid>
      <Grid item>
        <FakeInput
          label={formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.PhoneNumber}.label`)}
          value={formatMessage(`Watchlist.fakeInputs.${ValidatedInputsKeys.PhoneNumber}.value`)}
        />
      </Grid>
    </Grid>
  );
}
