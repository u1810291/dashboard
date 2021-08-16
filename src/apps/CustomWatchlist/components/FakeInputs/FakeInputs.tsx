import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { FakeInput } from './FakeInput';

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
      {fakeInputsFields.map((input) => <Grid item><FakeInput label={input.label} value={input.value} /></Grid>)}
    </Grid>
  );
}
