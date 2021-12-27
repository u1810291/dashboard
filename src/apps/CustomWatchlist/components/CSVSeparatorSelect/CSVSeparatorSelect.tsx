import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { CsvDelimiterTypes, CsvSeparatorInputEnum, CustomWatchlistModalValidationInputs } from '../../models/CustomWatchlist.models';
import { useStyles } from './CSVSeparatorSelect.styles';

function CSVSeparatorSelectMenuItem({ value }: { value: CsvSeparatorInputEnum }) {
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

export function CSVSeparatorSelect({ defaultValue = CsvDelimiterTypes[CsvSeparatorInputEnum.Comma] }: { defaultValue?: string }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const { control, formState: { errors } } = useFormContext();

  return (
    <Grid container alignItems="center" justifyContent="space-between" className={classes.marginTop20}>
      <Grid item className={classes.title}>{formatMessage('CustomWatchlist.settings.modal.select.csvSeparator.title')}</Grid>
      <Grid item className={classes.selectWrap}>
        <Controller
          name={CustomWatchlistModalValidationInputs.CsvSeparator}
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
            >
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Semicolon]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Semicolon} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Comma]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Comma} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Dot]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Dot} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Tab]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Tab} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputEnum.Pipe]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputEnum.Pipe} />
              </MenuItem>
            </Select>
          )}
        />
      </Grid>
      {errors[CustomWatchlistModalValidationInputs.CsvSeparator] && <span className={classes.red}>{errors[CustomWatchlistModalValidationInputs.CsvSeparator]?.message}</span>}
    </Grid>
  );
}
