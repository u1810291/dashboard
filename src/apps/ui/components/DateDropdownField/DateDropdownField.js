import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { MonthLabels } from 'apps/ui/models/Dropdown.model';
import { DateFormat, getDaysToArray, getYearsArray, MomentDateParts } from 'lib/date';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useStyles } from './DateDropdownField.styles';

export function DateDropdownField({ fieldId, dateString, onChange, fromYear = 1900, toYear = 2100 }) {
  const intl = useIntl();
  const classes = useStyles();
  const years = useMemo(() => getYearsArray(fromYear, toYear), [fromYear, toYear]);

  const selectValues = useMemo(() => {
    const date = moment(dateString, DateFormat.DateShortStroke);
    return {
      date: date?.date() || '',
      month: date?.month() ?? '',
      year: date?.year() || '',
    };
  }, [dateString]);

  const selectedMoment = useMemo(() => {
    const newDate = moment(selectValues);
    if (newDate.isValid()) {
      return newDate;
    }
    return null;
  }, [selectValues]);

  const days = useMemo(() => {
    if (!selectedMoment) {
      return [];
    }
    return getDaysToArray(selectedMoment.daysInMonth());
  }, [selectedMoment]);

  const handleSelect = useCallback((part) => ({ target: { value } }) => {
    const newDate = selectedMoment?.clone().set(part, value);
    if (newDate) {
      const formattedString = newDate.format(DateFormat.DateShortStroke);
      onChange(fieldId, formattedString);
    }
  }, [fieldId, onChange, selectedMoment]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl className={classes.control}>
          <InputLabel className={classes.label}>
            {intl.formatMessage({ id: 'DocumentReadingStep.Day' })}
          </InputLabel>
          <Select className={classes.select} MenuProps={{ className: classes.selectMenu }} onChange={handleSelect(MomentDateParts.Date)} value={selectValues.date} IconComponent={FiChevronDown}>
            {days?.map((day) => (<MenuItem className={classes.selectItem} key={day} value={day}>{day}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl className={classes.control}>
          <InputLabel className={classes.label}>
            {intl.formatMessage({ id: 'DocumentReadingStep.Month' })}
          </InputLabel>
          <Select className={classes.select} MenuProps={{ className: classes.selectMenu }} onChange={handleSelect(MomentDateParts.Month)} value={selectValues.month} IconComponent={FiChevronDown}>
            {Object.keys(MonthLabels).map((month) => (<MenuItem className={classes.selectItem} key={month} value={month}>{MonthLabels[month]}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl className={classes.control}>
          <InputLabel className={classes.label}>
            {intl.formatMessage({ id: 'DocumentReadingStep.Year' })}
          </InputLabel>
          <Select className={classes.select} MenuProps={{ className: classes.selectMenu }} onChange={handleSelect(MomentDateParts.Year)} value={selectValues.year} IconComponent={FiChevronDown}>
            {years.map((year) => (<MenuItem className={classes.selectItem} key={year} value={year}>{year}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
