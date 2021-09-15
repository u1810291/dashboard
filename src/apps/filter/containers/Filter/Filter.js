import { Box, Button, Grid, Typography } from '@material-ui/core';
import { allDatePickerRanges } from 'models/Filter.model';
import { QATags } from 'models/QA.model';
import { REDUCE_DB_COUNT_CALLS } from 'models/Release.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectPreliminaryFilteredCountModel } from 'state/identities/identities.selectors';
import { todayMomentEndTime } from 'lib/date';
import { DateRange } from '../../components/DateRange/DateRange';
import { useStyles } from './Filter.styles';

export function Filter({ children, onClose, onSetFilter, selectFilter, cleanFilter, datePickerRanges = allDatePickerRanges, loadPreliminaryCountAction, preliminaryCountSelector, fromMonth }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();
  const preliminaryFilteredCountModel = useSelector(preliminaryCountSelector || selectPreliminaryFilteredCountModel);
  const [bufferedFilter, setBufferedFilter] = useState({ flowIds: [], ...selectFilter });
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [currentDate] = useState(todayMomentEndTime.toDate());

  const handleFilterChange = useCallback((params) => {
    setBufferedFilter((prevState) => ({ ...prevState, ...params }));
  }, [setBufferedFilter]);

  useEffect(() => {
    // TODO: @ggrigorev
    // TODO: @vladislav.snimshchikov find a better way to prevent double /count request, problem is at DateRange/useEffect/handleOnRangeClick
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (!REDUCE_DB_COUNT_CALLS && loadPreliminaryCountAction) {
      dispatch(loadPreliminaryCountAction({ ...bufferedFilter }, true));
    }
  }, [isFirstRender, bufferedFilter, dispatch, loadPreliminaryCountAction]);

  const handleDateChange = useCallback((dateRange) => {
    handleFilterChange(dateRange);
  }, [handleFilterChange]);

  const handleClearAll = useCallback(() => {
    handleFilterChange(cleanFilter);
  }, [cleanFilter, handleFilterChange]);

  const handleApplyFilterChanges = useCallback(() => {
    onSetFilter({ ...bufferedFilter });
    onClose();
  }, [bufferedFilter, onClose, onSetFilter]);

  return (
    <Box>
      {/* header */}
      <Box className={classes.header}>
        <Typography variant="h4">{intl.formatMessage({ id: 'VerificationFilter.title' })}</Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container spacing={2} direction="column">
          {/* date range */}
          <Grid item>
            <Typography variant="subtitle2">
              <Box display="flex" alignItems="center" pb={1}>
                <FiCalendar />
                <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.date.title' })}</Box>
              </Box>
            </Typography>
            <DateRange
              start={bufferedFilter['dateCreated[start]']}
              end={bufferedFilter['dateCreated[end]']}
              onChange={handleDateChange}
              datePickerRanges={datePickerRanges}
              fromMonth={fromMonth}
              toMonth={currentDate}
            />
          </Grid>
          <Box className={classes.hr} mb={0.5} />
          <Grid container item spacing={3} className={classes.checks}>
            {/* All filter children blocks */}
            {React.Children.map(children, (child) => React.cloneElement(child, { onFilterChange: handleFilterChange, bufferedFilter }))}
          </Grid>
          <Grid />
        </Grid>
      </Box>
      <Box className={classes.footer}>
        <Box className={classes.footerLeft}>
          {/* clear all */}
          <Button
            data-qa={QATags.Filter.ClearAllButton}
            className={classes.clearButton}
            onClick={handleClearAll}
            startIcon={<FiX />}
          >
            {intl.formatMessage({ id: 'VerificationFilter.clear-all' })}
          </Button>
          {/* preliminary count */}
          {!REDUCE_DB_COUNT_CALLS && loadPreliminaryCountAction && preliminaryCountSelector && (
            <Box>
              <Typography variant="body1" className={classes.resultsText}>
                {intl.formatMessage({ id: 'VerificationFilter.count.identities' }, { count: preliminaryFilteredCountModel.value })}
              </Typography>
            </Box>
          )}
        </Box>
        {/* view results */}
        <Box className={classes.footerRight}>
          <Button
            data-qa={QATags.Filter.ApplyFilterButton}
            className={classes.submitButton}
            variant="contained"
            color="primary"
            onClick={handleApplyFilterChanges}
          >
            {intl.formatMessage({ id: 'VerificationFilter.button.viewResults' })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
