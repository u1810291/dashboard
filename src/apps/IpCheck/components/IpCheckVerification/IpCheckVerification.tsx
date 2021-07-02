import { Box, Grid, Typography } from '@material-ui/core';
import { CheckResultLogo, SkeletonLoader } from 'apps/ui';
import { IpCheckStep } from 'models/IpCheck.model';
import { StepStatus } from 'models/Step.model';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { useStyles } from './IpCheckVerification.styles';

export function IpCheckVerification({ data: step }: {
  data: IpCheckStep,
}) {
  const intl = useIntl();
  const classes = useStyles();
  const isChecking = useMemo(() => step?.status < 200, [step]);
  const data = useMemo(() => step?.data, [step]);
  const status = useMemo(() => {
    if (isChecking) {
      return StepStatus.Checking;
    }
    return step?.data?.safe
      ? StepStatus.Success
      : StepStatus.Failure;
  }, [step, isChecking]);

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
        <Grid container item xs={12} xl={4} alignContent="flex-start" className={classes.itemWrapper}>
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
                {intl.formatMessage({ id: 'IpCheckStep.country' })}
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
                {intl.formatMessage({ id: 'IpCheckStep.city' })}
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
                {intl.formatMessage({ id: 'IpCheckStep.province' })}
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
                {intl.formatMessage({ id: 'IpCheckStep.zipCode' })}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* proxy usage banner */}
        <Grid item xs={12} xl={4} className={classes.itemWrapper}>
          <CheckResultLogo type="ipCheck" status={status} />
        </Grid>
      </Grid>
    </Box>
  );
}
