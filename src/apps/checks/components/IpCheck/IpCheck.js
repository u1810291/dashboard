import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { BoxBordered, CheckResultLogo, SkeletonLoader } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { StepStatus } from 'models/Step.model';
import { IpCheckErrorCodes } from 'apps/IpCheck/models/IpCheck.model';
import { getIpCheckStatusByError } from 'models/IpCheck.model';
import { useStyles } from './IpCheck.styles';

function IpCheckComponent({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  if (!step) {
    return null;
  }

  const vpnStatus = getIpCheckStatusByError(step, IpCheckErrorCodes.VpnDetected);
  const geoStatus = getIpCheckStatusByError(step, IpCheckErrorCodes.Restricted);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2">{intl.formatMessage({ id: 'IpCheckStep.title' })}</Typography>
        </Box>
        <Grid container className={classes.wrapper}>
          {/* Google Map */}
          <Grid container justify="center" alignItems="center" item xs={12} md={4} className={classes.map}>
            {step.isChecking ? (
              <SkeletonLoader animation="wave" variant="rect" height={202} />
            ) : (
              <StaticGoogleMap size="400x200" scale={2} zoom={10} apiKey={process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}>
                <Marker location={{ lat: step.data?.latitude, lng: step.data?.longitude }} />
              </StaticGoogleMap>
            )}
          </Grid>

          {/* Detected location fields */}
          <Grid container item xs={12} md={4} alignContent="flex-start">
            <BoxBordered width="100%">
              <Grid item xs={6} md={12} container direction="column">
                <Box mb={2}>
                  <Typography variant="subtitle2" className={classes.data}>
                    {step.isChecking ? (
                      <SkeletonLoader animation="wave" variant="text" />
                    ) : step.data?.country}
                  </Typography>
                  <Typography variant="body1" className={classes.title}>
                    {intl.formatMessage({ id: 'IpCheckStep.country' })}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle2" className={classes.data}>
                    {step.isChecking ? (
                      <SkeletonLoader animation="wave" variant="text" />
                    ) : step.data?.city}
                  </Typography>
                  <Typography variant="body1" className={classes.title}>
                    {intl.formatMessage({ id: 'IpCheckStep.city' })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={12} container direction="column">
                <Box mb={2}>
                  <Typography variant="subtitle2" className={classes.data}>
                    {step.isChecking ? (
                      <SkeletonLoader animation="wave" variant="text" />
                    ) : step.data?.region}
                  </Typography>
                  <Typography variant="body1" className={classes.title}>
                    {intl.formatMessage({ id: 'IpCheckStep.province' })}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle2" className={classes.data}>
                    {step.isChecking ? (
                      <SkeletonLoader animation="wave" variant="text" />
                    ) : step.data?.zip}
                  </Typography>
                  <Typography variant="body1" className={classes.title}>
                    {intl.formatMessage({ id: 'IpCheckStep.zipCode' })}
                  </Typography>
                </Box>
              </Grid>
            </BoxBordered>
          </Grid>

          {/* proxy usage banner */}
          <Grid item xs={12} md={4} className={classes.checkResultWrapper}>
            <BoxBordered p={2} mb={1.4} height="50%">
              <CheckResultLogo type="ipCheckVpn" status={vpnStatus} />
            </BoxBordered>
            <BoxBordered p={2} height="50%">
              {
                vpnStatus === StepStatus.Failure
                  ? <CheckResultLogo type="ipCheckGeoWithVpn" status={vpnStatus} />
                  : <CheckResultLogo type="ipCheckGeo" status={geoStatus} />
              }
            </BoxBordered>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export const IpCheck = React.memo(IpCheckComponent);
