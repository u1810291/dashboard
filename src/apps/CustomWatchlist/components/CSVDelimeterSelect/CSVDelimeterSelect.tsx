import React from 'react';
import { useIntl } from 'react-intl';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { CsvDelimiterTypes, CsvDelimiterInputTypes, CustomWatchlistModalValidationInputs } from 'models/CustomWatchlist.model';
import { useStyles } from './CSVDelimeterSelect.styles';

export const CSVDelimeterSelect = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { control, formState: { errors } } = useFormContext();

  return (
    <Grid container alignItems="center" justifyContent="space-between" className={classes.marginTop20}>
      <Grid item className={classes.title}>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.select.csvDelimiter.title' })}</Grid>
      <Grid item className={classes.selectWrap}>
        <Controller
          name={CustomWatchlistModalValidationInputs.CsvDelimiter}
          control={control}
          rules={{ required: intl.formatMessage({ id: 'validations.required' }) }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              id="csv-delimiter"
              variant="standard"
              fullWidth
              error={!!error}
              className={classes.select}
            >
              <MenuItem value={CsvDelimiterTypes[CsvDelimiterInputTypes.Semicolon]}>
                {CsvDelimiterTypes[CsvDelimiterInputTypes.Semicolon]}
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvDelimiterInputTypes.Comma]}>
                {CsvDelimiterTypes[CsvDelimiterInputTypes.Comma]}
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvDelimiterInputTypes.Dot]}>
                {CsvDelimiterTypes[CsvDelimiterInputTypes.Dot]}
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvDelimiterInputTypes.Tab]}>
                {CsvDelimiterTypes[CsvDelimiterInputTypes.Tab]}
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvDelimiterInputTypes.Pipe]}>
                {CsvDelimiterTypes[CsvDelimiterInputTypes.Pipe]}
              </MenuItem>
            </Select>
          )}
        />
      </Grid>
      {errors[CustomWatchlistModalValidationInputs.CsvDelimiter] && <span className={classes.red}>{errors[CustomWatchlistModalValidationInputs.CsvDelimiter]?.message}</span>}
    </Grid>
  );
};
