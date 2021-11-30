import { Grid } from '@material-ui/core';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { ValidatedInput } from '../ValidatedInput/ValidatedInput';
import { selectCurrentCustomWatchlistError } from '../../state/CustomWatchlist.selectors';
import { ValidatedInputsKeys, WatchlistMappingOptions } from '../../models/CustomWatchlist.models';

export const placeholderKey = 'placeholder';

interface ValidatedInputsFieldValuesOptions {
  fuzziness?: number;
}

export interface SelectedOptions {
  [key: string]: {
    label: string;
    value: string;
    options?: ValidatedInputsFieldValuesOptions;
  };
}

export interface ValidatedInputsFieldTypes {
  label: string;
  value: string;
  options?: ValidatedInputsFieldValuesOptions;
}

export function ValidatedInputs({ fieldValues, onChange }: { fieldValues: ValidatedInputsFieldTypes[]; onChange: (mapping: ValidatedInputsFieldTypes[]) => void }) {
  const intl = useIntl();
  // TODO: STAGE 3, @richvoronov get currentWatchlist.error and show in ui
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentWatchlistError = useSelector(selectCurrentCustomWatchlistError);
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
    onChange(Object.values(selectedOptions));
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
