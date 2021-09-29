import { Box, Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import { allDatePickerRanges, FilterRangesByLocal, FilterRangeTypes, identifyRange, RangeParts, RangeSlices } from 'models/Filter.model';
import classNames from 'classnames';
import { DateFormat, dayEndTime, getYearsArray, toLocalDate, utcToLocalFormat, zeroTime } from 'lib/date';
import { QATags } from 'models/QA.model';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantCreatedAt, selectLanguage } from 'state/merchant/merchant.selectors';
import MomentLocaleUtils from 'react-day-picker/moment';
import { useStyles } from './DateRange.styles';

export function DateRange({ onChange, start, end, datePickerRanges = allDatePickerRanges, fromMonth, toMonth }) {
  const intl = useIntl();
  const classes = useStyles();
  const registerDate = useSelector(selectMerchantCreatedAt);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [visibleMonth, setVisibleMonth] = useState(toMonth);
  const currentLocale = useSelector(selectLanguage);

  const [yearsRange, setYearsRange] = useState({
    from: from?.getFullYear() || '',
    to: to?.getFullYear() || '',
  });
  const [modifiers, setModifiers] = useState({
    start: from,
    end: to,
  });

  const availableYears = useMemo(() => {
    if (moment(fromMonth)?.isValid() && moment(toMonth)?.isValid()) {
      return getYearsArray(fromMonth.getFullYear(), toMonth.getFullYear());
    }
    return [];
  }, [fromMonth, toMonth]);

  // Restrict dates to today and registration date
  const restrictMomentDate = useCallback((momentDate) => {
    const registerMoment = moment(registerDate);

    if (momentDate.isBefore(registerMoment)) {
      return registerMoment;
    }

    if (momentDate.isAfter(moment(toMonth))) {
      return moment(toMonth);
    }
    return momentDate;
  }, [registerDate, toMonth]);

  const changeRange = useCallback((startDate, endDate) => {
    setFrom(startDate);
    setTo(endDate);
    setModifiers({
      start: startDate,
      end: endDate,
    });
    setYearsRange({
      from: startDate?.getFullYear() || '',
      to: endDate?.getFullYear() || '',
    });
    const rangeId = identifyRange(startDate, endDate, registerDate, datePickerRanges);
    setSelectedRange(rangeId);
  }, [datePickerRanges, registerDate]);

  const handlePartRangeChanged = useCallback((partName, setPart, date) => {
    const stateFieldName = partName === RangeParts.Start ? RangeSlices.From : RangeSlices.To;
    setPart(date);
    setModifiers((prevState) => ({
      ...prevState,
      [partName]: date,
    }));
    setYearsRange((prevState) => ({
      ...prevState,
      [stateFieldName]: date?.getFullYear() || '',
    }));
    onChange({ [`dateCreated[${partName}]`]: !date ? null : moment(date) });
  }, [onChange]);

  const handleStartRangeChanged = useCallback((startDate: Date, isScrollToDate: boolean = false) => {
    handlePartRangeChanged(RangeParts.Start, setFrom, startDate);
    if (isScrollToDate) {
      setVisibleMonth(startDate);
    }
  },
  [handlePartRangeChanged]);

  const handleEndRangeChanged = useCallback((endDate: Date, isScrollToDate: boolean = false) => {
    handlePartRangeChanged(RangeParts.End, setTo, endDate);
    if (isScrollToDate) {
      setVisibleMonth(endDate);
    }
  },
  [handlePartRangeChanged]);

  const handleOnRangeClick = useCallback((rangeItem) => {
    const {
      start: startMoment,
      end: endMoment,
    } = rangeItem.getMomentPeriod(rangeItem.id === FilterRangeTypes.All && registerDate);

    const startDate = restrictMomentDate(startMoment).toDate();
    const endDate = restrictMomentDate(endMoment).toDate();
    handleStartRangeChanged(startDate, true);
    handleEndRangeChanged(endDate, true);
    setSelectedRange(rangeItem.id);
  }, [handleEndRangeChanged, handleStartRangeChanged, registerDate, restrictMomentDate]);

  const handleDayClick = useCallback((day, modif = {}) => {
    if (modif.disabled) {
      return;
    }
    const range = DateUtils.addDayToRange(day, {
      from,
      to,
    });
    const fromDate = range.from && moment(range.from).set(zeroTime).toDate();
    const toDate = range.to && moment(range.to).set(dayEndTime).toDate();
    handleStartRangeChanged(fromDate);
    handleEndRangeChanged(toDate);
    setSelectedRange(null);
  }, [from, handleEndRangeChanged, handleStartRangeChanged, to]);

  const handleYearChange = useCallback((firstDate, secondDate, setDate) => ({ target: { value } }) => {
    if (!value || !moment.isDate(firstDate) || !moment.isDate(secondDate)) {
      return;
    }

    const momentDate = moment(firstDate).set({ year: value });
    const dates = [moment(firstDate), moment(secondDate)];
    const isFromDateFirst = moment(firstDate).isBefore(secondDate);
    const [startDate, endDate] = isFromDateFirst ? dates : dates.reverse();

    // The start date cannot be greater than the end
    if (isFromDateFirst && momentDate.isAfter(endDate)) {
      setDate(endDate.subtract(1, 'day').toDate(), true);
      return;
    }

    // The end date cannot be less than the start date
    if (!isFromDateFirst && momentDate.isBefore(startDate)) {
      setDate(startDate.add(1, 'day').toDate(), true);
      return;
    }

    setDate(restrictMomentDate(momentDate).toDate(), true);
  }, [restrictMomentDate]);

  useEffect(() => {
    if (!start && !end) {
      handleOnRangeClick(FilterRangesByLocal[FilterRangeTypes.Last7Days]);
    } else {
      changeRange(toLocalDate(start), toLocalDate(end));
    }
  }, [start, end, changeRange, handleOnRangeClick]);

  return (
    <Box className={classes.calendarWrap}>
      <Box className={classes.calendar}>
        <Grid className={classes.range} container alignItems="center">
          <Grid className={classes.rangeItem} container alignItems="center" wrap="nowrap">
            <Box mr={1} fontSize={18} fontWeight="bold">
              {utcToLocalFormat(from, DateFormat.DayMonthShort)}
            </Box>
            <FormControl>
              <Select
                MenuProps={{ className: classes.rangeSelect, disableScrollLock: true }}
                onChange={handleYearChange(from, to, handleStartRangeChanged)}
                value={yearsRange.from}
                disabled={!yearsRange?.from}
                disableUnderline
                IconComponent={FiChevronDown}
                SelectDisplayProps={{ 'data-qa': QATags.Filter.DatePicker.YearsFromSelect } as any}
              >
                {availableYears.map((year) => (
                  <MenuItem className={classes.rangeSelectItem} key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box className={classes.rangeDivider} />
          </Grid>
          <Grid className={classes.rangeItem} container alignItems="center" wrap="nowrap">
            <Box mr={1} fontSize={18} fontWeight="bold">
              {utcToLocalFormat(to, DateFormat.DayMonthShort)}
            </Box>
            <FormControl>
              <Select
                MenuProps={{ className: classes.rangeSelect, disableScrollLock: true }}
                onChange={handleYearChange(to, from, handleEndRangeChanged)}
                value={yearsRange.to}
                disabled={!yearsRange?.to}
                disableUnderline
                IconComponent={FiChevronDown}
                SelectDisplayProps={{ 'data-qa': QATags.Filter.DatePicker.YearsToSelect } as any}
              >
                {availableYears.map((year) => (
                  <MenuItem className={classes.rangeSelectItem} key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DayPicker
          fixedWeeks
          localeUtils={MomentLocaleUtils}
          locale={currentLocale}
          onDayClick={handleDayClick}
          numberOfMonths={2}
          modifiers={modifiers}
          month={visibleMonth}
          toMonth={toMonth}
          fromMonth={fromMonth}
          disabledDays={{ before: fromMonth, after: toMonth }}
          selectedDays={[from, { from, to }]}
        />
      </Box>
      <Box data-qa={QATags.Filter.DatePicker.Periods} className={classes.period}>
        {datePickerRanges.map((rangeItem) => (
          <Button key={rangeItem.id} className={classNames({ selected: selectedRange === rangeItem.id })} onClick={() => handleOnRangeClick(rangeItem)}>
            {intl.formatMessage({ id: `DateRange.${rangeItem.id}` })}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
