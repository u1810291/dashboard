import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import { Box } from '@material-ui/core';
import CSS from './DateRange.module.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function isOutSideRangeFn(day) {
  return moment().diff(day) < 1000;
}

export function DateRange({ start, end, onChange }) {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputFocus = useCallback((input) => {
    setFocusedInput(input);
  }, []);

  const handleDateChange = useCallback(({ startDate, endDate }) => {
    if (startDate) {
      startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    if (endDate) {
      endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
    }
    onChange({ startDate, endDate });
  }, [onChange]);

  return (
    <Box className={CSS.datePicker}>
      <DateRangePicker
        hideKeyboardShortcutsPanel
        appendToBody
        numberOfMonths={1}
        startDate={start}
        startDateId="startDate"
        endDate={end}
        endDateId="endDate"
        isOutsideRange={isOutSideRangeFn}
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={handleInputFocus}
      />
    </Box>
  );
}
