import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { DateFormat, toLocalDate } from '../../../../lib/date';
import { selectUserRegistrationDate } from '../../../user/state/user.selectors';
import { useStyles } from './DateRange.styles';

export const DateRange = ({ onChange, start, end }) => {
  const intl = useIntl();
  const [from, setFrom] = useState(null);
  const classes = useStyles();
  const [to, setTo] = useState(null);
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [startFormInvalid, setStartFormInvalid] = useState(false);
  const [endFormInvalid, setEndFormInvalid] = useState(false);
  const [selectedRange, setSelectedRange] = useState('');
  const [today] = useState(moment().toDate());
  const [modifiers, setModifiers] = useState({
    start: from,
    end: to,
  });
  const selectRegisterDate = useSelector(selectUserRegistrationDate);

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
    setModifiers({ start: startDate, end: endDate });
  }, [setEndInput, setStartInput]);

  useEffect(() => {
    changeRange(toLocalDate(start), toLocalDate(end));
  }, [start, end, changeRange]);

  const handleStartRangeChanged = useCallback((startDate) => {
    setFrom(startDate);
    setStartInput(startDate);
    setModifiers((prevState) => ({ ...prevState, start: startDate }));
    onChange({ 'dateCreated[start]': !startDate ? null : moment(startDate) });
  }, [onChange, setStartInput]);

  const handleEndRangeChanged = useCallback((endDate) => {
    setTo(endDate);
    setEndInput(endDate);
    setModifiers((prevState) => ({ ...prevState, end: endDate }));
    onChange({ 'dateCreated[end]': !endDate ? null : moment(endDate) });
  }, [onChange, setEndInput]);

  const ranges = [
    {
      id: 'all',
      name: intl.formatMessage({ id: 'DateRange.all' }),
      setRange: () => {
        const startDate = new Date(selectRegisterDate);
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(today);
      },
    },
    {
      id: 'today',
      name: intl.formatMessage({ id: 'DateRange.today' }),
      setRange: () => {
        handleStartRangeChanged(today);
        handleEndRangeChanged(today);
      },
    },
    {
      id: 'yesterday',
      name: intl.formatMessage({ id: 'DateRange.yesterday' }),
      setRange: () => {
        const date = moment()
          .subtract(1, 'days')
          .toDate();
        handleStartRangeChanged(date);
        handleEndRangeChanged(date);
      },
    },
    {
      id: 'last7Days',
      name: intl.formatMessage({ id: 'DateRange.lastNumDays' }, { count: 7 }),
      setRange: () => {
        const startDate = moment()
          .subtract(7, 'days')
          .toDate();
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(today);
      },
    },
    {
      id: 'last30Days',
      name: intl.formatMessage({ id: 'DateRange.lastNumDays' }, { count: 30 }),
      setRange: () => {
        const startDate = moment()
          .subtract(30, 'days')
          .toDate();
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(today);
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
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(endDate);
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
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(endDate);
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
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(endDate);
      },
    },
    {
      id: 'thisMonth',
      name: intl.formatMessage({ id: 'DateRange.thisMonth' }),
      setRange: () => {
        const startDate = moment()
          .startOf('month')
          .toDate();
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(today);
      },
    },
    {
      id: 'thisWeek',
      name: intl.formatMessage({ id: 'DateRange.thisWeek' }),
      setRange: () => {
        const startDate = moment()
          .startOf('week')
          .toDate();
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(today);
      },
    },
    {
      id: 'thisYear',
      name: intl.formatMessage({ id: 'DateRange.thisYear' }),
      setRange: () => {
        const startDate = moment()
          .startOf('year')
          .toDate();
        handleStartRangeChanged(startDate);
        handleEndRangeChanged(today);
      },
    },
  ];

  const handleDayClick = useCallback((day) => {
    const range = DateUtils.addDayToRange(day, {
      from,
      to,
    });
    handleStartRangeChanged(range.from);
    handleEndRangeChanged(range.to);
  }, [from, handleEndRangeChanged, handleStartRangeChanged, to]);

  const handleInputChange = useCallback(({ target: { value, name } }) => {
    const parsedDate = moment(value, 'DD MMM,YYYY', true);
    if (name === 'start') {
      setFormStart(value);
      if (parsedDate.isValid()) {
        setStartFormInvalid(false);
        setFrom(parsedDate.toDate());
        setModifiers(((prevState) => ({ ...prevState, start: parsedDate.toDate() })));
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
        setModifiers(((prevState) => ({ ...prevState, end: parsedDate.toDate() })));
        handleEndRangeChanged(parsedDate.toDate());
      } else {
        setEndFormInvalid(value !== '');
        setTo(null);
      }
    }
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
