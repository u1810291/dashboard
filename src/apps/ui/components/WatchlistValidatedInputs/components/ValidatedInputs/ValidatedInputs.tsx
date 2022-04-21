import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { ValidatedInputsFieldValuesOptions, IValidatedInputsFieldTypes, WatchlistValidatedInputsErrors, SelectedOptions, ValidatedInputsKeys } from '../../../../models/WatchlistValidatedInputs.model';
import { ValidatedInputsError } from '../ValidatedInputsError/ValidatedInputsError';
import { ValidatedInput } from '../ValidatedInput/ValidatedInput';

export function ValidatedInputs({ fieldValues, disabled, hasOptions = true, onChange, errors }: {
  fieldValues: IValidatedInputsFieldTypes[];
  disabled: boolean;
  hasOptions: boolean;
  onChange: (mapping: IValidatedInputsFieldTypes[]) => void;
  errors: WatchlistValidatedInputsErrors;
}) {
  const formatMessage = useFormatMessage();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(fieldValues?.reduce((prev, cur) => (
    {
      ...prev,
      [cur.label]: {
        label: cur.label,
        value: cur.value,
        ...(cur?.options && { options: cur.options }),
      },
    }
  ), {}));

  const inputOptions = useMemo(() => [
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.FullName}.label`),
      value: ValidatedInputsKeys.FullName,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.DateOfBirth}.label`),
      value: ValidatedInputsKeys.DateOfBirth,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.DocumentNumber}.label`),
      value: ValidatedInputsKeys.DocumentNumber,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.Country}.label`),
      value: ValidatedInputsKeys.Country,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.DocumentType}.label`),
      value: ValidatedInputsKeys.DocumentType,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.EmailAddress}.label`),
      value: ValidatedInputsKeys.EmailAddress,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.PhoneNumber}.label`),
      value: ValidatedInputsKeys.PhoneNumber,
    },
    {
      label: formatMessage(`Watchlist.validationFields.${ValidatedInputsKeys.NotSelected}.label`),
      value: ValidatedInputsKeys.NotSelected,
    },
  ], [formatMessage]);

  const handleChange = useCallback((values: { value: ValidatedInputsKeys; name?: string; options?: ValidatedInputsFieldValuesOptions }) => {
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
              disabled={disabled}
              hasOptions={hasOptions}
            />
          </Grid>
          {selectedOptions[input.label].value !== ValidatedInputsKeys.NotSelected && <ValidatedInputsError inputValue={selectedOptions[input.label].value} errors={errors} />}
        </Grid>
      ))}
    </Grid>
  );
}
