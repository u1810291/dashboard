import { Box, Grid } from '@material-ui/core';
import { BiometricStep, getBiometricCheckStatus, IDuplicateSelfieStepData, LivenessStepStatus } from 'models/Biometric.model';
import { CheckResultLogo } from 'apps/ui';
import { IStep, StepTypes } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { DuplicateSelfieCheck } from 'apps/checks/components/DuplicateSelfieCheck/DuplicateSelfieCheck';
import { MediaStatusTypes } from 'apps/media';
import { LivenessMedia } from '../LivenessMedia/LivenessMedia';
import { useStyles } from './NewLivenessStep.styles';
import { LivenessConslusion } from '../LivenessConslusion/LivenessConslusion';

export function NewLivenessStep({ duplicateFaceDetection, steps = [], downloadableFileName }: {
  duplicateFaceDetection: IStep<IDuplicateSelfieStepData>;
  steps: BiometricStep[];
  downloadableFileName: string;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const checkStatus = getBiometricCheckStatus(steps);

  return (
    <Box>
      <Grid container>
        {checkStatus !== LivenessStepStatus.Disabled && (
          <Grid
            container
            item
            xs={12}
            xl={4}
            className={classes.wrapper}
          >
            {checkStatus !== LivenessStepStatus.FewData && steps.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* video */}
                {item?.videoUrl !== MediaStatusTypes.MediaIsEmpty && (
                  <Grid
                    container
                    item
                    xs={12}
                    xl={steps.length === 2 ? 4 : 6}
                    key={index}
                    className={classes.mediaItem}
                  >
                    <Grid item xs={12}>
                      <LivenessMedia
                        video={item.videoUrl}
                        title={intl.formatMessage({ id: `LivenessStep.Checks.${item.id}.title` })}
                        withSoundButton={item.id === StepTypes.Voice}
                      />
                    </Grid>
                  </Grid>
                )}
              </React.Fragment>
            ))}
            <Grid item xs={12} xl={steps.length === 2 ? 4 : 6} className={classes.mediaItem}>
              {/* image */}
              {steps[0]?.selfieUrl && (
                <LivenessMedia
                  image={steps[0].selfieUrl}
                  title={intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })}
                  subtitle={steps[0]?.videoUrl !== MediaStatusTypes.MediaIsEmpty && intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}
                  downloadableFileName={downloadableFileName}
                />
              )}
            </Grid>
          </Grid>
        )}
        <LivenessConslusion steps={steps}>
          <CheckResultLogo status={checkStatus} type="biometric" />
          {duplicateFaceDetection && <DuplicateSelfieCheck stepData={duplicateFaceDetection} />}
        </LivenessConslusion>
      </Grid>
    </Box>
  );
}
