import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { WarningTypes, Warning } from 'apps/ui';
import { useStyles } from './IpCheck.styles';

export function IpCheck({ data }) {
  const intl = useIntl();
  const classes = useStyles();

  const isProxy = !data?.safe;

  return (
    <Paper>
      <Box p={3}>
        <Box display="flex" flexWrap="wrap">
          <Box flex="1 0 auto">
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h4" color="initial">
                  {intl.formatMessage({ id: 'IpCheckStep.title' })}
                </Typography>
              </Grid>

              {/* proxy usage banner */}
              <Grid item>
                <Box mb={1}>
                  <Warning
                    type={isProxy ? WarningTypes.Error : WarningTypes.Success}
                    label={intl.formatMessage({ id: isProxy ? 'IpCheckStep.vpnDetected' : 'IpCheckStep.noVpnDetected' })}
                  />
                </Box>
              </Grid>

              {/* Detected location fields */}
              <Grid container item spacing={2}>
                <Grid item xs={6} container direction="column" spacing={2}>
                  <Grid item>{intl.formatMessage({ id: 'IpCheckStep.country' })}</Grid>
                  <Grid item>{intl.formatMessage({ id: 'IpCheckStep.province' })}</Grid>
                  <Grid item>{intl.formatMessage({ id: 'IpCheckStep.city' })}</Grid>
                  <Grid item>{intl.formatMessage({ id: 'IpCheckStep.zipCode' })}</Grid>
                </Grid>
                <Grid item xs={6} container direction="column" spacing={2} className={classes.values}>
                  <Grid item>{data.country}</Grid>
                  <Grid item>{data.region}</Grid>
                  <Grid item>{data.city}</Grid>
                  <Grid item>{data.zip}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Google Map */}
          <Box flex="0 0 340px" mt={2} className={classes.mapContainer}>
            <Grid className={classes.map}>
              <StaticGoogleMap size="307x202" scale={2} zoom={10} apiKey={process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}>
                <Marker location={{ lat: data.latitude, lng: data.longitude }} />
              </StaticGoogleMap>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
