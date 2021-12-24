import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { ValidatedInput } from '../ValidatedInput/ValidatedInput';
import { ValidatedInputsFieldTypesExtended, IValidatedInputsFieldTypes, ValidatedInputsKeys, WatchlistMappingOptions } from '../../models/CustomWatchlist.models';
import { CustomWatchlistValidatedInputsError } from '../CustomWatchlistValidatedInputsError/CustomWatchlistValidatedInputsError';

export interface SelectedOptions {
  [key: string]: ValidatedInputsFieldTypesExtended;
}

export function ValidatedInputs({ fieldValues, onChange }: {
  fieldValues: ValidatedInputsFieldTypesExtended[];
  onChange: (mapping: IValidatedInputsFieldTypes[]) => void;
}) {
  const formatMessage = useFormatMessage();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(fieldValues?.reduce((prev, cur) => (
    {
      ...prev,
      [cur.label]: {
        label: cur.label,
        value: cur.value,
        // inputLabel: cur.value === ValidatedInputsKeys.NotSelected ? formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.NotSelected}.label`) : cur.label,
      },
    }
  ), {}));

  const inputOptions = useMemo(() => [
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.FullName}.label`),
      value: ValidatedInputsKeys.FullName,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DateOfBirth}.label`),
      value: ValidatedInputsKeys.DateOfBirth,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DocumentNumber}.label`),
      value: ValidatedInputsKeys.DocumentNumber,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.Country}.label`),
      value: ValidatedInputsKeys.Country,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.DocumentType}.label`),
      value: ValidatedInputsKeys.DocumentType,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.EmailAddress}.label`),
      value: ValidatedInputsKeys.EmailAddress,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.PhoneNumber}.label`),
      value: ValidatedInputsKeys.PhoneNumber,
    },
    {
      label: formatMessage(`CustomWatchlist.settings.modal.validationFields.${ValidatedInputsKeys.NotSelected}.label`),
      value: ValidatedInputsKeys.NotSelected,
    },
  ], [formatMessage]);

  const handleChange = useCallback((values: { value: ValidatedInputsKeys; name?: string; options?: WatchlistMappingOptions }) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [values.name]: {
        label: values.name,
        value: values.value,
        ...(values?.options && { options: values.options }),
      },
    }));
  }, []);

  useEffect(() => {
    onChange(Object.values(selectedOptions));
  }, [selectedOptions, onChange]);

  return (
    <Grid container direction="column" spacing={1}>
      {fieldValues.map((input) => (
        <Grid key={`${input.label}-${input.value}`} container item direction="column">
          <Grid item>
            <ValidatedInput
              placeholderKey={ValidatedInputsKeys.NotSelected}
              title={input.label}
              name={input.label}
              onChange={handleChange}
              selectedOptions={selectedOptions}
              options={inputOptions}
              value={selectedOptions[input.label].value}
            />
          </Grid>
          {selectedOptions[input.label].value !== ValidatedInputsKeys.NotSelected && <CustomWatchlistValidatedInputsError inputValue={selectedOptions[input.label].value} />}
        </Grid>
      ))}
    </Grid>
  );
}
