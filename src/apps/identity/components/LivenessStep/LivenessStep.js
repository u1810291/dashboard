import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { getBiometricCheckStatus, LivenessStepStatus } from 'models/Biometric.model';
import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { LivenessMedia } from '../LivenessMedia/LivenessMedia';
import { CheckResultLogo } from '../CheckResultLogo/CheckResultLogo';
import { CheckBarExpandable } from '../CheckBarExpandable/CheckBarExpandable';
import { BiometricStepTypes, StepStatus } from '../../../../models/Step.model';
import { useStyles } from './LivenessStep.styles';
import { CheckStepDetails } from '../CheckStepDetails/CheckStepDetails';

export function LivenessStep({ steps }) {
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
                <>
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
                </>
              ))}
              <Grid item xs={6} md={steps.length === 2 ? 4 : 6} className={classes.mediaItem}>
                {/* image */}
                {steps[0].selfieUrl && (
                  <LivenessMedia
                    image={steps[0].selfieUrl}
                    title={intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })}
                    subtitle={steps[0].videoUrl && intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}
                  />
                )}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} md={4} className={classes.itemWrapper}>
            <Box mx={0.7}>
              <CheckResultLogo status={checkStatus} type="biometric" />
            </Box>
            <Grid item container>
              {steps.map((step) => {
                if (step.checkStatus === StepStatus.Success && !step.videoUrl) return null;
                return (
                  <CheckBarExpandable step={step} key={step.id}>
                    <CheckStepDetails step={step} />
                  </CheckBarExpandable>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
