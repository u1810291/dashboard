import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../../lib/date';
import { selectUserRegistrationDate } from '../../../user/state/user.selectors';
import { useStyles } from './DateRange.styles';

export const DateRange = ({ onChange, start, end }) => {
  const intl = useIntl();
  const [from, setFrom] = useState(null);
  const classes = useStyles();
  const [to, setTo] = useState(null);
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [startFormValid, setStartFormValid] = useState(false);
  const [endFormValid, setEndFormValid] = useState(false);
  const [selectedRange, setSelectedRange] = useState('');
  const [today] = useState(moment().toDate());
  const [modifiers, setModifiers] = useState({
    start: from,
    end: to,
  });
  const selectRegisterDate = useSelector(selectUserRegistrationDate);

  const setInputs = useCallback((startDate, endDate) => {
    const dateFormat = 'DD MMM,YYYY';
    if (startDate) {
      setFormStart(formatDate(startDate, dateFormat));
      setStartFormValid(false);
    }
    if (endDate) {
      setFormEnd(formatDate(endDate, dateFormat));
      setEndFormValid(false);
    }
  }, [setFormStart, setFormEnd]);

  useEffect(() => {
    setInputs(start, end);
  }, [start, end, setInputs]);

  useEffect(() => {
    setFrom(start?.toDate());
    setTo(end?.toDate());
  }, [start, end]);

  const handleRangeChanged = useCallback((startDate, endDate) => {
    setFrom(startDate);
    setTo(endDate);
    setInputs(startDate, endDate);
    const resultChanges = {};
    if (startDate) {
      resultChanges.startDate = moment(startDate);
      setModifiers((prevState) => ({ ...prevState, start: startDate }));
    }
    if (endDate) {
      resultChanges.endDate = moment(endDate);
      setModifiers((prevState) => ({ ...prevState, end: endDate }));
    }
    onChange(resultChanges);
  }, [onChange, setInputs]);

  const ranges = [
    {
      id: 'all',
      name: intl.formatMessage({ id: 'DateRange.all' }),
      setRange: () => {
        const startDate = new Date(selectRegisterDate);
        handleRangeChanged(startDate, today);
      },
    },
    {
      id: 'today',
      name: intl.formatMessage({ id: 'DateRange.today' }),
      setRange: () => {
        handleRangeChanged(today, today);
      },
    },
    {
      id: 'yesterday',
      name: intl.formatMessage({ id: 'DateRange.yesterday' }),
      setRange: () => {
        const date = moment()
          .subtract(1, 'days')
          .toDate();
        handleRangeChanged(date, date);
      },
    },
    {
      id: 'last7Days',
      name: intl.formatMessage({ id: 'DateRange.lastNumDays' }, { count: 7 }),
      setRange: () => {
        const startDate = moment()
          .subtract(7, 'days')
          .toDate();
        handleRangeChanged(startDate, today);
      },
    },
    {
      id: 'last30Days',
      name: intl.formatMessage({ id: 'DateRange.lastNumDays' }, { count: 30 }),
      setRange: () => {
        const startDate = moment()
          .subtract(30, 'days')
          .toDate();
        handleRangeChanged(startDate, today);
      },
    },
    {
      id: 'lastWeek',
      name: intl.formatMessage({ id: 'DateRange.lastWeek' }),
      setRange: () => {
        const startDate = moment()
          .startOf('week')
          .subtract(1, 'week')
          .toDate();
        const endDate = moment(startDate)
          .endOf('week')
          .toDate();
        handleRangeChanged(startDate, endDate);
      },
    },
    {
      id: 'lastMonth',
      name: intl.formatMessage({ id: 'DateRange.lastMonth' }),
      setRange: () => {
        const startDate = moment()
          .startOf('month')
          .subtract(1, 'month')
          .toDate();
        const endDate = moment(startDate)
          .endOf('month')
          .toDate();
        handleRangeChanged(startDate, endDate);
      },
    },
    {
      id: 'lastYear',
      name: intl.formatMessage({ id: 'DateRange.lastYear' }),
      setRange: () => {
        const startDate = moment()
          .startOf('year')
          .subtract(1, 'year')
          .toDate();
        const endDate = moment(startDate)
          .endOf('year')
          .toDate();
        handleRangeChanged(startDate, endDate);
      },
    },
    {
      id: 'thisMonth',
      name: intl.formatMessage({ id: 'DateRange.thisMonth' }),
      setRange: () => {
        const startDate = moment()
          .startOf('month')
          .toDate();
        handleRangeChanged(startDate, today);
      },
    },
    {
      id: 'thisWeek',
      name: intl.formatMessage({ id: 'DateRange.thisWeek' }),
      setRange: () => {
        const startDate = moment()
          .startOf('week')
          .toDate();
        handleRangeChanged(startDate, today);
      },
    },
    {
      id: 'thisYear',
      name: intl.formatMessage({ id: 'DateRange.thisYear' }),
      setRange: () => {
        const startDate = moment()
          .startOf('year')
          .toDate();
        handleRangeChanged(startDate, today);
      },
    },
  ];

  const handleDayClick = useCallback((day) => {
    const range = DateUtils.addDayToRange(day, {
      from,
      to,
    });
    handleRangeChanged(range.from, range.to);
  }, [from, handleRangeChanged, to]);

  const handleInputChange = useCallback(({ target: { value, name } }) => {
    const parsedDate = moment(value, 'DD-MMM-YYYY');
    if (name === 'start') {
      setFormStart(value);
      if (parsedDate.isValid()) {
        setStartFormValid(false);
        setFrom(parsedDate.toDate());
      } else {
        setStartFormValid(true);
        setFrom(null);
      }
    }
    if (name === 'end') {
      setFormEnd(value);
      if (parsedDate.isValid()) {
        setEndFormValid(false);
        setTo(parsedDate.toDate());
      } else {
        setEndFormValid(true);
        setTo(null);
      }
    }
  }, []);
  return (
    <Box className={classes.calendarWrap}>
      <Box className={classes.calendar}>
        <Box className={classes.range}>
          <TextField
            name="start"
            error={startFormValid}
            onChange={handleInputChange}
            value={formStart}
            variant="outlined"
            placeholder={intl.formatMessage({ id: 'DateRange.startDate' })}
          />
          <Box className={classes.rangeDivider} />
          <TextField
            name="end"
            error={endFormValid}
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
        {ranges.map((item) => (
          <Button
            key={item.id}
            className={classNames({ selected: selectedRange === item.id })}
            onClick={() => {
              item.setRange();
              setSelectedRange(item.id);
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
