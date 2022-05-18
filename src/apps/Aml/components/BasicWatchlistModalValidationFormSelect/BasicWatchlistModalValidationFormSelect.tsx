import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import { IBasicWatchlistGroupsOption } from '../../models/Aml.model';
import { useStyles } from './BasicWatchlistModalValidationFormSelect.styles';

export function BasicWatchlistModalValidationFormSelect({ options, disabled = false, defaultValue, name }: {
  options: IBasicWatchlistGroupsOption[];
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
 }) {
  const formatMessage = useFormatMessage();
  const { control } = useFormContext();
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: formatMessage('validations.required') }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          <Select
            {...field}
            id="csv-delimiter"
            variant="outlined"
            error={!!error}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value} className={classes.menuItem}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error?.message && <FormHelperText variant="outlined">{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
