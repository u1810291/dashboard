import React from 'react';
import { useIntl } from 'react-intl';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { CsvDelimiterTypes, CsvSeparatorInputTypes, CustomWatchlistModalValidationInputs } from 'models/CustomWatchlist.model';
import { useStyles } from './CSVSeparatorSelect.styles';

function CSVSeparatorSelectMenuItem({ value }: { value: CsvSeparatorInputTypes }) {
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

export const CSVSeparatorSelect = ({ defaultValue = CsvDelimiterTypes[CsvSeparatorInputTypes.Comma] }: { defaultValue?: string }) => {
  const intl = useIntl();
  const classes = useStyles();
  const { control, formState: { errors } } = useFormContext();

  return (
    <Grid container alignItems="center" justifyContent="space-between" className={classes.marginTop20}>
      <Grid item className={classes.title}>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.select.csvSeparator.title' })}</Grid>
      <Grid item className={classes.selectWrap}>
        <Controller
          name={CustomWatchlistModalValidationInputs.CsvSeparator}
          control={control}
          rules={{ required: intl.formatMessage({ id: 'validations.required' }) }}
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
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputTypes.Semicolon]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputTypes.Semicolon} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputTypes.Comma]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputTypes.Comma} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputTypes.Dot]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputTypes.Dot} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputTypes.Tab]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputTypes.Tab} />
              </MenuItem>
              <MenuItem value={CsvDelimiterTypes[CsvSeparatorInputTypes.Pipe]}>
                <CSVSeparatorSelectMenuItem value={CsvSeparatorInputTypes.Pipe} />
              </MenuItem>
            </Select>
          )}
        />
      </Grid>
      {errors[CustomWatchlistModalValidationInputs.CsvSeparator] && <span className={classes.red}>{errors[CustomWatchlistModalValidationInputs.CsvSeparator]?.message}</span>}
    </Grid>
  );
};
