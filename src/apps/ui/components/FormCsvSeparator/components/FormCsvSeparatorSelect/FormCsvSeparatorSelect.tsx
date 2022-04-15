import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { CsvDelimiterTypes, CsvSeparatorInputEnum } from '../../models/FormCsvSeparator.model';
import { useStyles } from './FormCsvSeparatorSelect.styles';

function CsvSeparatorSelectMenuItem({ value }: { value: CsvSeparatorInputEnum }) {
  const classes = useStyles();
  return (
    <>
      <span className={classes.menuItemLabel}>
        {value}
      </span>
      {CsvDelimiterTypes[value]}
    </>
  );
}

export function FormCsvSeparatorSelect({ disabled = false, defaultValue = CsvDelimiterTypes[CsvSeparatorInputEnum.Comma], name }: {
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
 }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: formatMessage('validations.required') }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          id="csv-delimiter"
          variant="standard"
          fullWidth
          error={!!error}
          className={classes.select}
          renderValue={(value) => value}
          disabled={disabled}
        >
          <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Semicolon]}>
            <CsvSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Semicolon} />
          </MenuItem>
          <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Comma]}>
            <CsvSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Comma} />
          </MenuItem>
          <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Dot]}>
            <CsvSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Dot} />
          </MenuItem>
          <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Tab]}>
            <CsvSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Tab} />
          </MenuItem>
          <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Pipe]}>
            <CsvSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Pipe} />
          </MenuItem>
        </Select>
      )}
    />
  );
}
