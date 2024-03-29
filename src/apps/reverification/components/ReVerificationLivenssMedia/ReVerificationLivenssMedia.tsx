import { Box, Typography, Grid } from '@material-ui/core';
import { LivenessMedia } from 'apps/biometrics/components/LivenessMedia/LivenessMedia';
import { BoxBordered } from 'apps/ui';
import { IReFacematchStep } from 'models/ReVerification.model';
import { useIntl } from 'react-intl';
import React from 'react';
import { useStyles } from './ReVerificationLivenssMedia.styles';
import { OriginalVerificationButton } from '../OriginalVerificationButton/OriginalVerificationButton';

export function ReVerificationLivenssMedia({
  reFacematch,
  identity,
}: {
  reFacematch: IReFacematchStep;
  identity: string;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box>
      <Box mb={1}>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage({ id: 'ReVerification.result.currentBiometricData' })}
        </Typography>
      </Box>
      <BoxBordered mb={2}>
        <Grid container>
          {reFacematch?.data?.currentSelfieVideoUrl && (
            <Grid item xs={12} xl={6} className={classes.mediaItem}>
              <LivenessMedia
                video={reFacematch?.data?.currentSelfieVideoUrl}
                title={intl.formatMessage({ id: 'ReVerification.result.movementLiveness' })}
                downloadableFileName={reFacematch?.downloadableFileName}
              />
            </Grid>
          )}
          <Grid item xs={12} xl={6} className={classes.mediaItem}>
            <LivenessMedia
              image={reFacematch?.data?.currentSelfiePhotoUrl}
              title={intl.formatMessage({ id: `ReVerification.result.${reFacematch?.data?.currentSelfieVideoUrl ? 'screenshotFromVideo' : 'selfie'}` })}
              downloadableFileName={reFacematch?.downloadableFileName}
            />
          </Grid>
        </Grid>
      </BoxBordered>
      <Box mb={1}>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage({ id: 'ReVerification.result.originBiometricData' })}
        </Typography>
      </Box>
      <BoxBordered mb={2}>
        <Grid container>
          {reFacematch?.data?.previousSelfieVideoUrl && (
            <Grid item xs={12} xl={6} className={classes.mediaItem}>
              <LivenessMedia
                video={reFacematch?.data?.previousSelfieVideoUrl}
                title={intl.formatMessage({ id: 'ReVerification.result.movementLiveness' })}
                downloadableFileName={reFacematch?.downloadableFileName}
              />
            </Grid>
          )}
          <Grid item xs={12} xl={6} className={classes.mediaItem}>
            <LivenessMedia
              image={reFacematch?.data?.previousSelfiePhotoUrl}
              title={intl.formatMessage({ id: `ReVerification.result.${reFacematch?.data?.previousSelfieVideoUrl ? 'screenshotFromVideo' : 'selfie'}` })}
              downloadableFileName={reFacematch?.downloadableFileName}
            />
          </Grid>
        </Grid>
        {reFacematch?.data?.previousVerificationId && (
          <Box mt={2}>
            <OriginalVerificationButton identity={identity} verification={reFacematch?.data?.previousVerificationId} />
          </Box>
        )}
      </BoxBordered>
    </Box>
  );
}
