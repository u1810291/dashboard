import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { getBiometricStatus } from 'models/Biometric.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckBarFlat } from '../CheckBarFlat/CheckBarFlat';
import { LivenessMedia } from '../LivenessMedia/LivenessMedia';

export function LivenessStep({ steps }) {
  const intl = useIntl();
  const status = getBiometricStatus(steps);

  return (
    <Paper>
      <Box px={3} py={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">
              {intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
            </Typography>
            <Box mt={2}>
              <CheckBarFlat step={status} isShowExtra />
            </Box>
          </Grid>
          <Grid item xs={6}>
            {steps.map((item, index) => (
              <Grid container spacing={2} key={index}>
                {/* video */}
                <Grid item xs={6}>
                  {item.videoUrl && (
                    <LivenessMedia
                      video={item.videoUrl}
                      title={intl.formatMessage({ id: `LivenessStep.Checks.${item.id}.title` })}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {/* image */}
                  {item.selfieUrl && (
                    <LivenessMedia
                      image={item.selfieUrl}
                      title={intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })}
                      subtitle={item.videoUrl && intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}
                    />
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
