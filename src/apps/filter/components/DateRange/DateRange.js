import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { selectUserRegistrationDate } from 'apps/user/state/user.selectors';
import classNames from 'classnames';
import { DateFormat, dayEndTime, toLocalDate, zeroTime } from 'lib/date';
import { allLocalRanges, allUTCRanges, FilterRangeTypes, identifyRange } from 'models/Filter.model';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useStyles } from './DateRange.styles';

export const DateRange = ({ onChange, start, end, isUTCDates }) => {
  const intl = useIntl();
  const classes = useStyles();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [startFormInvalid, setStartFormInvalid] = useState(false);
  const [endFormInvalid, setEndFormInvalid] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [allRanges] = useState(isUTCDates ? allUTCRanges : allLocalRanges);
  const [modifiers, setModifiers] = useState({
    start: from,
    end: to,
  });
  const registerDate = useSelector(selectUserRegistrationDate);

  const setStartInput = useCallback((startDate) => {
    setStartFormInvalid(false);
    if (!startDate) {
      setFormStart('');
      return;
    }
    let date = moment(startDate);
    date = !date.isValid() ? '' : date.format(DateFormat.MonthShort);
    setFormStart(date);
  }, [setFormStart]);

  const setEndInput = useCallback((endDate) => {
    setEndFormInvalid(false);
    if (!endDate) {
      setFormEnd('');
      return;
    }
    let date = moment(endDate);
    date = !date.isValid() ? '' : date.format(DateFormat.MonthShort);
    setFormEnd(date);
  }, [setFormEnd]);

  const changeRange = useCallback((startDate, endDate) => {
    setStartInput(startDate);
    setEndInput(endDate);
    setFrom(startDate);
    setTo(endDate);
    setModifiers({
      start: startDate,
      end: endDate,
    });
    const rangeId = identifyRange(startDate, endDate, registerDate, allRanges);
    setSelectedRange(rangeId);
  }, [allRanges, registerDate, setEndInput, setStartInput]);

  useEffect(() => {
    changeRange(toLocalDate(start), toLocalDate(end));
  }, [start, end, changeRange]);

  const handleStartRangeChanged = useCallback((startDate) => {
    setFrom(startDate);
    setStartInput(startDate);
    setModifiers((prevState) => ({
      ...prevState,
      start: startDate,
    }));
    onChange({ 'dateCreated[start]': !startDate ? null : moment(startDate) });
  }, [onChange, setStartInput]);

  const handleEndRangeChanged = useCallback((endDate) => {
    setTo(endDate);
    setEndInput(endDate);
    setModifiers((prevState) => ({
      ...prevState,
      end: endDate,
    }));
    onChange({ 'dateCreated[end]': !endDate ? null : moment(endDate) });
  }, [onChange, setEndInput]);

  const handleOnRangeClick = useCallback((rangeItem) => {
    const { start: startMoment, end: endMoment } = rangeItem.getMomentPeriod(rangeItem.id === FilterRangeTypes.All && registerDate);
    handleStartRangeChanged(startMoment.toDate());
    handleEndRangeChanged(endMoment.toDate());
    setSelectedRange(rangeItem.id);
  }, [handleEndRangeChanged, handleStartRangeChanged, registerDate]);

  const handleDayClick = useCallback((day) => {
    const range = DateUtils.addDayToRange(day, {
      from,
      to,
    });
    const fromDate = moment(range.from).set(zeroTime).toDate();
    const toDate = moment(range.to).set(dayEndTime).toDate();
    handleStartRangeChanged(fromDate);
    handleEndRangeChanged(toDate);
    setSelectedRange(null);
  }, [from, handleEndRangeChanged, handleStartRangeChanged, to]);

  const handleInputChange = useCallback(({ target: { value, name } }) => {
    const parsedDate = moment(value, 'DD MMM,YYYY', true);
    if (name === 'start') {
      setFormStart(value);
      if (parsedDate.isValid()) {
        setStartFormInvalid(false);
        setFrom(parsedDate.toDate());
        setModifiers(((prevState) => ({
          ...prevState,
          start: parsedDate.toDate(),
        })));
        handleStartRangeChanged(parsedDate.toDate());
      } else {
        setStartFormInvalid(value !== '');
        setFrom(null);
      }
    }
    if (name === 'end') {
      setFormEnd(value);
      if (parsedDate.isValid()) {
        setEndFormInvalid(false);
        setTo(parsedDate.toDate());
        setModifiers(((prevState) => ({
          ...prevState,
          end: parsedDate.toDate(),
        })));
        handleEndRangeChanged(parsedDate.toDate());
      } else {
        setEndFormInvalid(value !== '');
        setTo(null);
      }
    }
    setSelectedRange(null);
  }, [handleEndRangeChanged, handleStartRangeChanged]);
  return (
    <Box className={classes.calendarWrap}>
      <Box className={classes.calendar}>
        <Box className={classes.range}>
          <TextField
            name="start"
            error={startFormInvalid}
            onChange={handleInputChange}
            value={formStart}
            variant="outlined"
            placeholder={intl.formatMessage({ id: 'DateRange.startDate' })}
          />
          <Box className={classes.rangeDivider} />
          <TextField
            name="end"
            error={endFormInvalid}
            onChange={handleInputChange}
            value={formEnd}
            variant="outlined"
            placeholder={intl.formatMessage({ id: 'DateRange.endDate' })}
          />
        </Box>
        <DayPicker
          fixedWeeks
          onDayClick={handleDayClick}
          numberOfMonths={2}
          modifiers={modifiers}
          selectedDays={[from, {
            from,
            to,
          }]}
        />
      </Box>
      <Box className={classes.period}>
        {allRanges.map((rangeItem) => (
          <Button
            key={rangeItem.id}
            className={classNames({ selected: selectedRange === rangeItem.id })}
            onClick={() => handleOnRangeClick(rangeItem)}
          >
            {intl.formatMessage({ id: `DateRange.${rangeItem.id}` })}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
