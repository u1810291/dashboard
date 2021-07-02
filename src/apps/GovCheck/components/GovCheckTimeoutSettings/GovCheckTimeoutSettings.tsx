import { useIntl } from 'react-intl';
import React, { useCallback, useEffect, useState } from 'react';
import { FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { FiChevronDown } from 'react-icons/fi';
import { useStyles } from './GovCheckTimeoutSettings.styles';
import { convertTimeToHoursAndMinutes, GovTimeoutHours, GovTimeoutMinutes } from '../../models/GovCheck.model';

export function GovCheckTimeoutSettings({ postponedTimeout, onChange } : {
    postponedTimeout: string,
    onChange: (value: string) => void
  }) {
  const classes = useStyles();
  const intl = useIntl();
  const [timeoutHours, setTimeoutHours] = useState(12);
  const [timeoutMinutes, setTimeoutMinutes] = useState(0);
  const [hasUpdates, setHasUpdates] = useState(false);

  const handleSelectHours = useCallback((event) => {
    const newHours = event.target.value;
    if (newHours === 0 && timeoutMinutes === 0) {
      setTimeoutMinutes(5);
    }
    if (newHours === 24) {
      setTimeoutMinutes(0);
    }
    setTimeoutHours(newHours);
    setHasUpdates(true);
  }, [timeoutMinutes]);

  const handleSelectMinutes = useCallback((event) => {
    const newMinutes = event.target.value;
    if (newMinutes === 0 && timeoutHours === 0) {
      setTimeoutHours(1);
    }
    if (timeoutHours === 24 && newMinutes !== 0) {
      setTimeoutHours((prevState) => prevState - 1);
    }
    setTimeoutMinutes(newMinutes);
    setHasUpdates(true);
  }, [timeoutHours]);

  useEffect(() => {
    if (hasUpdates) {
      setHasUpdates(false);
      let result = 'PT';
      if (timeoutHours > 0) {
        result = `${result + timeoutHours}H`;
      }
      if (timeoutMinutes > 0) {
        result = `${result + timeoutMinutes}M`;
      }
      onChange(result);
    }
  }, [timeoutHours, timeoutMinutes, hasUpdates, onChange]);

  useEffect(() => {
    if (postponedTimeout) {
      const { hours, minutes } = convertTimeToHoursAndMinutes(postponedTimeout);
      setTimeoutHours(hours);
      setTimeoutMinutes(minutes);
    }
  }, [postponedTimeout]);

  return (
    <Grid container spacing={2} wrap="nowrap" alignItems="center">
      <Grid item xs={6}>
        <FormControl variant="outlined">
          <Grid container wrap="nowrap" alignItems="center">
            <Select
              labelId="hours-select-label"
              id="hours-select"
              className={classes.select}
              IconComponent={FiChevronDown}
              onChange={handleSelectHours}
              value={timeoutHours}
            >
              {GovTimeoutHours.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h5" className={classes.label}>
              {intl.formatMessage({ id: 'GovCheck.timeout.hours' })}
            </Typography>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined">
          <Grid container wrap="nowrap" alignItems="center">
            <Select
              labelId="minutes-select-label"
              id="minutes-select"
              className={classes.select}
              IconComponent={FiChevronDown}
              onChange={handleSelectMinutes}
              value={timeoutMinutes}
            >
              {GovTimeoutMinutes.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h5" className={classes.label}>
              {intl.formatMessage({ id: 'GovCheck.timeout.minutes' })}
            </Typography>
          </Grid>
        </FormControl>
      </Grid>
    </Grid>
  );
}
