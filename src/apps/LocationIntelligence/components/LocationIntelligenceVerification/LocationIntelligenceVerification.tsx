import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CheckResultLogo, SkeletonLoader } from 'apps/ui';
import classnames from 'classnames';
import { StepStatus } from 'models/Step.model';
import React, { useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { MarkerMap } from 'apps/googleMap';
import { useStyles } from './LocationIntelligenceVerification.styles';
import {
  LocationIntelligenceIconTypes,
  LocationIntelligencePlatformTypes,
  LocationIntelligenceVerificationOutput,
  SystemSubtype,
} from '../../models/LocationIntelligence.model';

export function LocationIntelligenceVerification({ data }: {data: LocationIntelligenceVerificationOutput}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  const sourceIconType = useMemo(() => (data?.platform === LocationIntelligencePlatformTypes.WebDesktop ? LocationIntelligenceIconTypes.Desktop : LocationIntelligenceIconTypes.Mobile), [data]);
  const { latitude, longitude, city, highAccuracy, region, postalCode, country, address, isRunning, zip } = data;

  const sourceIconSubtype = useMemo(() => {
    if (data?.platform === LocationIntelligencePlatformTypes.Android) {
      return SystemSubtype.Android;
    }
    if (data?.platform === LocationIntelligencePlatformTypes.IOs) {
      return SystemSubtype.iOS;
    }
    return null;
  }, [data]);

  const vpnStatus = useMemo(() => {
    if (data.isRunning) {
      return StepStatus.Checking;
    }
    if (data.vpnDetectionEnabled === undefined) {
      return data.vpnDetection ? StepStatus.Failure : StepStatus.Success;
    }
    if (!data?.vpnDetectionEnabled) {
      return StepStatus.Default;
    }
    return data.vpnDetection ? StepStatus.Failure : StepStatus.Success;
  }, [data]);

  const geoStatus = useMemo(() => {
    if (data.isRunning) {
      return StepStatus.Checking;
    }
    if (data.vpnDetection && !data.highAccuracy) {
      return StepStatus.Incomplete;
    }
    if (data.ipRestrictionEnabled === undefined) {
      return data.geoRestriction ? StepStatus.Failure : StepStatus.Success;
    }
    if (!data?.ipRestrictionEnabled) {
      return StepStatus.Default;
    }
    return data.geoRestriction ? StepStatus.Failure : StepStatus.Success;
  }, [data]);

  return (
    <Box>
      <Grid container className={classes.wrapper} justify="space-between">
        {/* proxy usage banner */}
        <Grid item xs={12} xl={4} lg={6} className={classes.itemWrapper}>
          <Typography className={classes.cardTitle}>
            {formatMessage('Checks.result.LocInt.information.title')}
          </Typography>
          <Box pt={1.6}>
            <CheckResultLogo type={sourceIconType} subtype={sourceIconSubtype} status={StepStatus.Default} newDesign />
          </Box>
          {!isRunning && highAccuracy && (
          <Box pt={1.6}>
            <CheckResultLogo
              type={LocationIntelligenceIconTypes.LatLong}
              status={StepStatus.Success}
              newDesign
              resultDescriptor={
                {
                  messageValues: {
                    latitude: latitude?.toFixed(4) || '-',
                    longitude: longitude?.toFixed(4) || '-',
                  },
                }
              }
            />
          </Box>
          )}
          <Box pt={1.6}>
            <CheckResultLogo type={LocationIntelligenceIconTypes.HighAccuracy} status={highAccuracy ? StepStatus.Success : StepStatus.Incomplete} newDesign />
          </Box>
          <Box pt={1.6}>
            <CheckResultLogo type={LocationIntelligenceIconTypes.VpnDetect} status={vpnStatus} newDesign />
          </Box>
          <Box pt={1.6}>
            <CheckResultLogo type={LocationIntelligenceIconTypes.GeoRestriction} status={geoStatus} newDesign />
          </Box>
        </Grid>
        {/* Detected location fields */}
        <Grid container item xs={12} xl={4} lg={6} alignContent="flex-start" className={classnames(classes.itemWrapper, classes.itemLocationWrapper)}>
          <Typography className={classes.cardTitle}>
            {formatMessage('Checks.result.LocInt.address.title')}
          </Typography>
          <Grid item xs={6} xl={12} container direction="column">
            {/* Address Line */}
            <Box mb={2} className={classes.cardContent}>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('LocIntStep.address')}
              </Typography>
              <Typography variant="subtitle2" className={classes.data}>
                {isRunning ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  // <>{data?.region}</>
                  <>{address || '-'}</>
                )}
              </Typography>
            </Box>
            <Box mb={2} className={classes.cardContent}>
              <Typography variant="body1" className={classes.title}>
                {`${formatMessage('IpCheckStep.city')}`}
              </Typography>
              <Typography variant="subtitle2" className={classes.data}>
                {isRunning ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{`${city || '-'}`}</>
                )}
              </Typography>
            </Box>
            <Box mb={2} className={classes.cardContent}>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.province')}
              </Typography>
              <Typography variant="subtitle2" className={classes.data}>
                {isRunning ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{`${region || '-'}`}</>
                )}
              </Typography>
            </Box>
            <Box mb={2} className={classes.cardContent}>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.zipCode')}
              </Typography>
              <Typography variant="subtitle2" className={classes.data}>
                {isRunning ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{postalCode || zip || '-' }</>
                )}
              </Typography>
            </Box>
            <Box mb={2} className={classes.cardContent}>
              <Typography variant="body1" className={classes.title}>
                {formatMessage('IpCheckStep.country')}
              </Typography>
              <Typography variant="subtitle2" className={classes.data}>
                {isRunning ? (
                  <SkeletonLoader animation="wave" variant="text" />
                ) : (
                  <>{country || '-'}</>
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {/* Google Map */}
        <Grid container justify="center" alignItems="center" item xs={12} xl={4} lg={12} className={classes.map}>
          {isRunning ? (
            <SkeletonLoader animation="wave" variant="rect" height={202} />
          ) : (
            <MarkerMap
              center={{ lat: latitude, lng: longitude }}
              className={classes.markerMap}
              position={{ lat: latitude, lng: longitude }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
