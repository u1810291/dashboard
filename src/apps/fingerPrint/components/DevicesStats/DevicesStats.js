import { Box, Grid, TableContainer } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { loadDevicesStatistics } from 'apps/analytics/state/metrics.actions';
import { selectDevicesStatistics, selectFilter } from 'apps/analytics/state/metrics.selectors';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { DevicesStatsTable } from './DevicesStatsTable/DevicesStatsTable';

export function DevicesStats() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { value: devicesStatistics } = useSelector(selectDevicesStatistics);
  const metricsFilter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(loadDevicesStatistics(metricsFilter));
  }, [dispatch, metricsFilter]);

  return (
    <TableContainer component={Paper}>
      <Box px={{ xs: 2, md: 4 }} py={2}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box mr={{ xs: 0, md: 3 }} mb={{ xs: 3, md: 0 }}>
              <DevicesStatsTable rows={devicesStatistics.devices} headerName={intl.formatMessage({ id: 'Analytics.devices.topDevices' })} />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box ml={{ xs: 0, md: 3 }}>
              <DevicesStatsTable rows={devicesStatistics.browsers} headerName={intl.formatMessage({ id: 'Analytics.devices.topBrowsers' })} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </TableContainer>
  );
}
