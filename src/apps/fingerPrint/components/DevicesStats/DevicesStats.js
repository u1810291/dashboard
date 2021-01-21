import { Box, Grid, TableContainer } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { loadDevicesStatistics } from 'apps/analytics/state/metrics.actions';
import { selectDevicesStatistics, selectFilter } from 'apps/analytics/state/metrics.selectors';
import { DevicesTableTypes } from 'apps/fingerPrint/fingerPrint.model';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { DevicesStatsTable } from './DevicesStatsTable/DevicesStatsTable';

export function DevicesStats() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { value: { devices, browsers } } = useSelector(selectDevicesStatistics);
  const metricsFilter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(loadDevicesStatistics(metricsFilter));
  }, [dispatch, metricsFilter]);

  return (
    <>
      {(devices?.length > 0 || browsers?.length > 0) && (
        <TableContainer component={Paper}>
          <Box px={{ xs: 2, md: 4 }} py={2}>
            <Grid container>
              {devices?.length > 0 && (
              <Grid item xs={12} md={5}>
                <Box mr={{ xs: 0, md: 6 }} mb={{ xs: 3, md: 0 }}>
                  <DevicesStatsTable type={DevicesTableTypes.devices} rows={devices} headerName={intl.formatMessage({ id: 'Analytics.devices.topDevices' })} />
                </Box>
              </Grid>
            )}
              {browsers?.length > 0 && (
              <Grid item xs={12} md={5}>
                <DevicesStatsTable type={DevicesTableTypes.browsers} rows={browsers} headerName={intl.formatMessage({ id: 'Analytics.devices.topBrowsers' })} />
              </Grid>
            )}
            </Grid>
          </Box>
        </TableContainer>
      )}
    </>
  );
}
