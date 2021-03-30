import { Grid, Typography, Select, MenuItem, FormControl } from '@material-ui/core';
import React, { useCallback, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectPostponedTimeout } from 'state/merchant/merchant.selectors';
import { BoxBordered } from 'apps/ui/components/BoxBordered/BoxBordered';
import { GovTimeoutHours, GovTimeoutMinutes, convertTimeToHoursAndMinutes } from '../../models/GovCheck.model';
import { useStyles } from './GovCheckTimeout.styles';

export function GovCheckTimeout({ onChange }) {
  const classes = useStyles();
  const intl = useIntl();
  const postponedTimeout = useSelector(selectPostponedTimeout);
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
    <BoxBordered>
      <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {intl.formatMessage({ id: 'GovCheck.timeout.title' })}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {intl.formatMessage({ id: 'GovCheck.timeout.description' })}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="center" justify="space-evenly">
            <FormControl variant="outlined">
              <Grid item container xs={6} direction="row" wrap="nowrap" alignItems="center">
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
                      checked={timeoutHours === item}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="h5" gutterBottom className={classes.label}>
                  {intl.formatMessage({ id: 'GovCheck.timeout.hours' })}
                </Typography>
              </Grid>
            </FormControl>
            <FormControl variant="outlined">
              <Grid item container xs={6} direction="row" wrap="nowrap" alignItems="center">
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
                      checked={timeoutMinutes === item}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="h5" gutterBottom className={classes.label}>
                  {intl.formatMessage({ id: 'GovCheck.timeout.minutes' })}
                </Typography>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </BoxBordered>
  );
}
