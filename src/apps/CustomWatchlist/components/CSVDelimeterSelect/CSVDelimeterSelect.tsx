import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { FlowWatchlistUi, CsvDelimiterTypes, CsvDelimiterInputTypes, CustomWatchlistModalValidationInputs } from 'models/CustomWatchlist.model';
import { useStyles } from './CSVDelimeterSelect.styles';

export const CSVDelimeterSelect = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { register } = useFormContext();

  const delimiterRegister = register(CustomWatchlistModalValidationInputs.CsvDelimiter);

  const handleSeverityChange = useCallback((watchlistValue: FlowWatchlistUi) => (event: React.ChangeEvent<{ value: unknown; name?: string }>) => {
    // onUpdate({ id: watchlistValue.id, severityOnMatch: event.target.value as CustomWatchlistSeverityOnMatchTypes });
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item className={classes.title}>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.select.csvDelimiter.title' })}</Grid>
      <Grid item className={classes.selectWrap}>
        <Select
          {...delimiterRegister}
          id="csv-delimiter"
          name="action"
          variant="standard"
          fullWidth
          // defaultValue={csvDelimiter.NoAction}
          // value={watchlist.severityOnMatch}
          // onChange={handleSeverityChange(watchlist)}
          // className={classnames(classes.actionSelect, classes[watchlist.severityOnMatch], {
          //   [classes.placeholder]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatchTypes.NoAction,
          // })}
          className={classes.select}
        >
          {/* <MenuItem
            key={CustomWatchlistSeverityOnMatchTypes.NoAction}
            value={CustomWatchlistSeverityOnMatchTypes.NoAction}
            className={classes.placeholder}
          >
            {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.placeholder' })}
          </MenuItem> */}
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
      </Grid>
    </Grid>
  );
};
