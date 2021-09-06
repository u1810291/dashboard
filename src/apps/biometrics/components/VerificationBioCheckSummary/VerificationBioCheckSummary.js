import { Box, Grid, Typography } from '@material-ui/core';
import { VerificationSummaryChecksContainer } from 'apps/checks/components/VerificationSummaryChecksContainer/VerificationSummaryChecksContainer';
import { VerificationCheckCard } from 'apps/identity/components/VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryTitle } from 'apps/identity/components/VerificationSummaryTitle/VerificationSummaryTitle';
import { SkeletonLoader } from 'apps/ui';
import { getBiometricCheckStatus, LivenessStepStatus } from 'models/Biometric.model';
import { VerificationSummaryTitleTypes } from 'models/Identity.model';
import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import IconEmpty from 'assets/icon-empty-photo.svg';
import { PrivateImage } from 'apps/media';
import { useStyles } from './VerificationBioCheckSummary.styles';

export function VerificationBioCheckSummary({ biometric, identity }) {
  const intl = useIntl();
  const classes = useStyles();
  const status = getBiometricCheckStatus(biometric);

  return (
    <VerificationCheckCard
      title={(
        <VerificationSummaryTitle status={status} type={VerificationSummaryTitleTypes.biometric}>
          {intl.formatMessage({ id: 'identity.summary.title.biometric' })}
        </VerificationSummaryTitle>
      )}
      bottomComponent={
        status !== LivenessStepStatus.FewData && status !== LivenessStepStatus.Disabled ? (
          <VerificationSummaryChecksContainer steps={biometric} />
        ) : (
          <VerificationSummaryTitle status={status} type={VerificationSummaryTitleTypes.biometric} isNoIcon>
            {intl.formatMessage({ id: `identity.summary.biometric.${status}` })}
          </VerificationSummaryTitle>
        )
      }
    >
      <Box className={classes.wrapper}>
        <Grid container className={classes.container}>
          {/* Regular flow */}
          {status !== StepStatus.Checking && (
            <>
              <Grid
                item
                container
                justify="center"
                alignContent="center"
                className={`${classes.imageBiometric} ${status !== LivenessStepStatus.Disabled && classes.image}`}
              >
                {/* Empty Photo */}
                {status === LivenessStepStatus.Disabled && (
                  <Box py={2} px={1} align="center">
                    <img src={IconEmpty} alt="" />
                    <Box align="center" className={classes.emptyCaption}>
                      {intl.formatMessage({ id: 'identity.summary.empty.img' })}
                    </Box>
                  </Box>
                )}
                {/* Not Empty Photo */}
                {status !== LivenessStepStatus.Disabled && biometric[0]?.selfieUrl && (
                  <Box align="center" height="100%">
                    <PrivateImage alt="" src={biometric[0].selfieUrl} />
                  </Box>
                )}
              </Grid>
              <Grid item container alignContent="center" className={classes.biometricText}>
                {/* Empty Name */}
                {!identity.fullName && (
                <Typography className={classes.emptyText} variant="body1" gutterBottom>
                  {intl.formatMessage({ id: 'identity.summary.empty.name' })}
                </Typography>
                )}
                {/* Not empty Name */}
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
