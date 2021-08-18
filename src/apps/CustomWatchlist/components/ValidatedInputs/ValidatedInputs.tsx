import { Grid } from '@material-ui/core';
import React, { useState, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ValidatedInput } from './ValidatedInput';

const placeholderKey = 'placeholder';

export function ValidatedInputs() {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const inputOptions = useMemo(() => [
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.name' }),
      value: 'name',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.dateOfBirth' }),
      value: 'dateOfBirth',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.nationalId' }),
      value: 'nationalId',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.drivingLicense' }),
      value: 'drivingLicense',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.passportNumber' }),
      value: 'passportNumber',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.countryCode' }),
      value: 'countryCode',
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.notSelected' }),
      value: placeholderKey,
    },
  ], [intl]);

  const handleChange = useCallback(
    (values: { value: string; name?: string; }) => {
      setSelectedOptions((prev) => [...prev, values.value]);
    },
    [],
  );

  return (
    <Grid container direction="column" spacing={1}>
      {['a', 'b', 'c'].map((input) => (
        <Grid key={input} item>
          <ValidatedInput
            placeholderKey={placeholderKey}
            label={input}
            onChange={handleChange}
            selectedOptions={selectedOptions}
            options={inputOptions}
          />
        </Grid>
      ))}
    </Grid>
  );
}
