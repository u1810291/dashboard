import { Grid } from '@material-ui/core';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ValidatedInputsKeys, WatchlistMappingOptions } from 'models/CustomWatchlist.model';
import { ValidatedInput } from '../ValidatedInput/ValidatedInput';

export const placeholderKey = 'placeholder';

export interface SelectedOptions {
  [key: string]: {
    label: string;
    value: string;
    options?: FieldValuesOptions;
  };
}

export interface FieldValuesOptions {
  fuzziness?: number;
}

interface FieldValues {
  label: string;
  value: string;
  options?: FieldValuesOptions;
}

export function ValidatedInputs({ fieldValues, onChange }: { fieldValues: FieldValues[]; onChange: Function }) {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(fieldValues.reduce((prev, cur) => ({ ...prev, [cur.value]: cur }), {}));

  const inputOptions = useMemo(() => [
    {
      label: intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.FullName}.label` }),
      value: ValidatedInputsKeys.FullName,
    },
    {
      label: intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DateOfBirth}.label` }),
      value: ValidatedInputsKeys.DateOfBirth,
    },
    {
      label: intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.NationalId}.label` }),
      value: ValidatedInputsKeys.NationalId,
    },
    {
      label: intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DrivingLicense}.label` }),
      value: ValidatedInputsKeys.DrivingLicense,
    },
    {
      label: intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.PassportNumber}.label` }),
      value: ValidatedInputsKeys.PassportNumber,
    },
    {
      label: intl.formatMessage({ id: `CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.CountryCode}.label` }),
      value: ValidatedInputsKeys.CountryCode,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.notSelected.label' }),
      value: placeholderKey,
    },
  ], [intl]);

  const handleChange = useCallback((values: { value: string; name?: string; options?: WatchlistMappingOptions }) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [values.name]: {
        label: inputOptions.find((option) => option.value === values.value).label,
        value: values.value,
        ...(values?.options && { options: values.options }),
      },
    }));
  }, [inputOptions]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <Grid container direction="column" spacing={1}>
      {fieldValues.map((input) => (
        <Grid key={input.value} item>
          <ValidatedInput
            placeholderKey={placeholderKey}
            title={input.label}
            name={input.value}
            onChange={handleChange}
            selectedOptions={selectedOptions}
            options={inputOptions}
            value={selectedOptions[input.value].value}
          />
        </Grid>
      ))}
    </Grid>
  );
}
