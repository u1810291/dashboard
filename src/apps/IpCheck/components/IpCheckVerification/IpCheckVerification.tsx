import { Box, Grid, Typography } from '@material-ui/core';
import { useFormatMessage } from 'apps/intl';
import { CheckResultLogo, SkeletonLoader } from 'apps/ui';
import classnames from 'classnames';
import { StepStatus } from 'models/Step.model';
import React, { useMemo } from 'react';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { useStyles } from './IpCheckVerification.styles';
import { IpCheckVerificationOutput } from '../../models/IpCheck.model';

export function IpCheckVerification({ data = {} as IpCheckVerificationOutput }: {
  data: IpCheckVerificationOutput;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const isChecking: boolean = data.isRunning;

  const vpnStatus = useMemo(() => {
    if (isChecking) {
      return StepStatus.Checking;
    }
    return data.vpnDetection ? StepStatus.Success : StepStatus.Failure;
  }, [isChecking, data]);

  const geoStatus = useMemo(() => {
    if (isChecking) {
      return StepStatus.Checking;
    }
    return data.geoRestriction ? StepStatus.Success : StepStatus.Failure;
  }, [isChecking, data]);

  return (
    <Box>
      <Grid container className={classes.wrapper}>
        {/* Google Map */}
        <Grid container justify="center" alignItems="center" item xs={12} xl={4} className={classes.map}>
          {isChecking ? (
            <SkeletonLoader animation="wave" variant="rect" height={202} />
          ) : (
            <StaticGoogleMap size="400x200" scale={2} zoom={10} apiKey={process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}>
              <Marker location={{ lat: data?.latitude, lng: data?.longitude }} />
            </StaticGoogleMap>
          )}
        </Grid>

        {/* Detected location fields */}
        <Grid container item xs={12} xl={4} alignContent="flex-start" className={classnames(classes.itemWrapper, classes.itemLocationWrapper)}>
          <Grid item xs={6} xl={12} container direction="column">
            <Box mb={2}>
              <Typography variant="subtitle2" className={classes.data}>
                {isChecking ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{data?.country}</>
                )}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.country')}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" className={classes.data}>
                {isChecking ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{data?.city}</>
                )}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.city')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} xl={12} container direction="column">
            <Box mb={2}>
              <Typography variant="subtitle2" className={classes.data}>
                {isChecking ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{data?.region}</>
                )}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.province')}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" className={classes.data}>
                {isChecking ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{data?.zip}</>
                )}
              </Typography>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.zipCode')}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* proxy usage banner */}
        <Grid item xs={12} xl={4} className={classes.itemWrapper}>
          <Box p={2} mb={1.4} height="50%">
            <CheckResultLogo type="ipCheckVpn" status={vpnStatus} />
          </Box>
          <Box p={2} height="50%">
            {vpnStatus === StepStatus.Failure ? (
              <CheckResultLogo type="ipCheckGeoWithVpn" status={vpnStatus} />
            ) : (
              <CheckResultLogo type="ipCheckGeo" status={geoStatus} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
