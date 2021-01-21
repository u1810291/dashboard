import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { CheckStepDetails } from 'apps/checks';
import { CheckBarExpandable, CheckResultLogo } from 'apps/ui';
import classNames from 'classnames';
import { getBiometricCheckStatus, LivenessStepStatus } from 'models/Biometric.model';
import { BiometricStepTypes } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { LivenessMedia } from '../LivenessMedia/LivenessMedia';
import { useStyles } from './LivenessStep.styles';

export function LivenessStep({ steps, downloadableFileName }) {
  const intl = useIntl();
  const classes = useStyles();
  const checkStatus = getBiometricCheckStatus(steps);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2">{intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}</Typography>
        </Box>
        <Grid container className={steps.length === 2 ? classes.wrapperBg : classes.wrapper}>
          {checkStatus !== LivenessStepStatus.Disabled && (
            <Grid
              container
              justify="center"
              item
              xs={12}
              md={steps.length === 2 ? 8 : 4}
              className={classNames(classes.info, {
                [classes.large]: steps.length === 2,
              })}
            >
              {checkStatus !== LivenessStepStatus.FewData && steps.map((item, index) => (
                <React.Fragment key={item.id}>
                  {/* video */}
                  {item.videoUrl && (
                    <Grid
                      container
                      item
                      xs={6}
                      md={steps.length === 2 ? 4 : 6}
                      key={index}
                      className={classes.mediaItem}
                    >
                      <Grid item xs={12}>
                        <LivenessMedia
                          video={item.videoUrl}
                          title={intl.formatMessage({ id: `LivenessStep.Checks.${item.id}.title` })}
                          withSoundButton={item.id === BiometricStepTypes.Voice}
                        />
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={6} md={steps.length === 2 ? 4 : 6} className={classes.mediaItem}>
                {/* image */}
                {steps[0].selfieUrl && (
                  <LivenessMedia
                    image={steps[0].selfieUrl}
                    title={intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })}
                    subtitle={steps[0].videoUrl && intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}
                    downloadableFileName={downloadableFileName}
                  />
                )}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} md={4} className={classes.itemWrapper}>
            <Box mx={{ xs: 'auto', md: 0.7 }}>
              <CheckResultLogo status={checkStatus} type="biometric" />
            </Box>
            <Grid item container>
              {steps.map((step) => (
                <CheckBarExpandable step={step} key={step.id}>
                  <CheckStepDetails step={step} />
                </CheckBarExpandable>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
