import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { CustomWatchlistSeverityOnMatchTypes, FlowWatchlistUi, CsvDelimiterTypes, CsvDelimiterInputTypes } from 'models/CustomWatchlist.model';
import { useStyles } from './CSVDelimeterSelect.styles';

export const CSVDelimeterSelect = ({ ...register }: any) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleSeverityChange = useCallback((watchlistValue: FlowWatchlistUi) => (event: React.ChangeEvent<{ value: unknown; name?: string }>) => {
    // onUpdate({ id: watchlistValue.id, severityOnMatch: event.target.value as CustomWatchlistSeverityOnMatchTypes });
  }, []);

  return (
    <Grid container>
      <Grid item>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.select.csvDelimiter.title' })}</Grid>
      <Grid item>
        <Select
          {...register}
          id="csv-delimiter"
          name="action"
          variant="outlined"
          fullWidth
          // defaultValue={csvDelimiter.NoAction}
          // value={watchlist.severityOnMatch}
          // onChange={handleSeverityChange(watchlist)}
          // className={classnames(classes.actionSelect, classes[watchlist.severityOnMatch], {
          //   [classes.placeholder]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatchTypes.NoAction,
          // })}
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
