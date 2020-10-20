import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { SkeletonLoader } from '../../../ui/components/SkeletonLoader/SkeletonLoader';
import IconEmpty from '../../../../assets/icon-empty-photo.svg';
import { StepStatus } from '../../../../models/Step.model';
import { VerificationCheckCard } from '../VerificationCheckCard/VerificationCheckCard';
import { useStyles } from './VerificationBioCheckSummary.styles';
import { getBiometricStatus } from '../../../../models/Biometric.model';
import { VerificationSummaryChecksContainer } from '../VerificationSummaryChecksContainer/VerificationSummaryChecksContainer';
import { VerificationSummaryTitle } from '../VerificationSummaryTitle/VerificationSummaryTitle';

export function VerificationBioCheckSummary({ biometric, identity }) {
  const intl = useIntl();
  const classes = useStyles();
  const { checkStatus: status } = getBiometricStatus(biometric);

  return (
    <VerificationCheckCard
      titleComponent={(
        <VerificationSummaryTitle status={status} type="biometric">
          {intl.formatMessage({ id: 'identity.summary.title.biometric' })}
        </VerificationSummaryTitle>
      )}
      bottomComponent={(
        <VerificationSummaryChecksContainer steps={biometric} />
      )}
    >
      <Box className={classes.wrapper}>
        <Grid container className={classes.container}>
          {/* Empty Biometrics Check */}
          {biometric.length === 0 && (
            <Grid
              item
              container
              justify="center"
              alignContent="center"
              className={`${classes.imageEmpty} ${classes.imageBiometric}`}
            >
              <Box py={2} px={1} align="center">
                <img src={IconEmpty} alt="" />
                <Box align="center" className={classes.emptyCaption}>
                  {intl.formatMessage({ id: 'identity.summary.empty.img' })}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Regular flow */}
          {status !== StepStatus.Checking && (
            <>
              <Grid
                item
                container
                justify="center"
                alignContent="center"
                className={`${classes.image} ${classes.imageBiometric}`}
              >
                <Box align="center" height="100%">
                  <img alt="" src={biometric[0].selfieUrl} />
                </Box>
              </Grid>
              <Grid item container alignContent="center" className={classes.biometricText}>
                {/* Empty Biometrics Check */}
                {!identity.fullName && (
                  <Typography className={classes.emptyText} variant="body1" gutterBottom>
                    {intl.formatMessage({ id: 'identity.summary.empty.name' })}
                  </Typography>
                )}
                {/* Not empty Biometrics Check */}
                {identity.fullName && (
                  <Typography className={classes.data} variant="subtitle2" gutterBottom>
                    {identity.fullName}
                  </Typography>
                )}
                <Typography className={classes.title} variant="body1">
                  {intl.formatMessage({ id: 'identity.field.name' })}
                </Typography>
              </Grid>
            </>
          )}

          {/* Running */}
          {status === StepStatus.Checking && (
            <>
              <Grid
                item
                container
                justify="center"
                alignContent="center"
                className={`${classes.imageEmpty} ${classes.imageBiometric}`}
              >
                <SkeletonLoader animation="wave" variant="rect" height={140} />
              </Grid>
              <Grid item container alignContent="flex-start" className={classes.biometricText}>
                <Typography alignSelf="flex-start" className={classes.emptyText} variant="body1">
                  <Box className={classes.skeleton} mb={1}>
                    <SkeletonLoader animation="wave" variant="text" />
                  </Box>
                  <Box className={classes.skeleton} mb={1}>
                    <SkeletonLoader animation="wave" variant="text" width={110} />
                  </Box>
                </Typography>
                <Typography className={classes.title} variant="body1">
                  {intl.formatMessage({ id: 'identity.field.name' })}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </VerificationCheckCard>
  );
}
