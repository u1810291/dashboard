import { Box, Grid, TableContainer } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { DevicesTableTypes } from 'models/DeviceCheck.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectDevicesStatistics } from '../../state/Analytics.selectors';
import { DevicesStatsTable } from '../DevicesStatsTable/DevicesStatsTable';

export function DevicesStats() {
  const intl = useIntl();
  const { devices, browsers } = useSelector(selectDevicesStatistics);

  if (!(devices?.length > 0 || browsers?.length > 0)) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Box px={{ xs: 2, md: 4 }} py={2}>
        <Grid container>
          {devices?.length > 0 && (
            <Grid item xs={12} md={5}>
              <Box mr={{ xs: 0, md: 6 }} mb={{ xs: 3, md: 0 }}>
                <DevicesStatsTable
                  type={DevicesTableTypes.devices}
                  rows={devices}
                  headerName={intl.formatMessage({ id: 'Analytics.devices.topDevices' })}
                />
              </Box>
            </Grid>
          )}
          {browsers?.length > 0 && (
            <Grid item xs={12} md={5}>
              <DevicesStatsTable
                type={DevicesTableTypes.browsers}
                rows={browsers}
                headerName={intl.formatMessage({ id: 'Analytics.devices.topBrowsers' })}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </TableContainer>
  );
}
