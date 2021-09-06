import { Grid } from '@material-ui/core';
import React, { useState, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ValidatedInputsKeys } from 'models/CustomWatchlist.model';
import { ValidatedInput } from './ValidatedInput';

const placeholderKey = 'placeholder';

export interface SelectedOptions {
  [key: string]: {
    label: string;
    value: string;
  };
}

export function ValidatedInputs() {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const inputOptions = useMemo(() => [
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.name' }),
      value: ValidatedInputsKeys.Name,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.dateOfBirth' }),
      value: ValidatedInputsKeys.DateOfBirth,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.nationalId' }),
      value: ValidatedInputsKeys.NationalId,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.drivingLicense' }),
      value: ValidatedInputsKeys.DrivingLicense,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.passportNumber' }),
      value: ValidatedInputsKeys.PassportNumber,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.countryCode' }),
      value: ValidatedInputsKeys.CountryCode,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.notSelected' }),
      value: placeholderKey,
    },
  ], [intl]);

  const handleChange = useCallback(
    (values: { value: string; name?: string }) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [values.name]: {
          label: inputOptions.find((option) => option.value === values.value).label,
          value: values.value,
        },
      }));
    },
    [inputOptions],
  );

  return (
    <Grid container direction="column" spacing={1}>
      {['a', 'b', 'c'].map((input) => (
        <Grid key={input} item>
          <ValidatedInput
            placeholderKey={placeholderKey}
            title={input}
            name={input}
            onChange={handleChange}
            selectedOptions={selectedOptions}
            options={inputOptions}
          />
        </Grid>
      ))}
    </Grid>
  );
}
