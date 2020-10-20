import { useIntl } from 'react-intl';
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useStyles } from './VerificationSummaryChecksContainer.styles';
import { StepStatus } from '../../../../models/Step.model';
import { CheckBarExpandableSummary } from '../CheckBarExpandableSummary/CheckBarExpandableSummary';
import { ReactComponent as IconError } from '../../../../assets/icon-identity-error.svg';
import { ReactComponent as IconLoad } from '../../../../assets/icon-load.svg';
import { SkeletonLoader } from '../../../ui/components/SkeletonLoader/SkeletonLoader';

export function VerificationSummaryChecksContainer({ steps }) {
  const intl = useIntl();
  const classes = useStyles();
  const passedSteps = steps.filter((step) => step.checkStatus === StepStatus.Success);
  const passedStepsCount = passedSteps.length;
  const failedSteps = steps.filter((step) => step.checkStatus === StepStatus.Failure);
  const checkingSteps = steps.filter((step) => step.checkStatus === StepStatus.Checking);
  return (
    <>
      {passedStepsCount > 0 && (
        <Box mt={1}>
          <CheckBarExpandableSummary
            title={intl.formatMessage({ id: 'verificationDetails.summary.checksPassed.title' }, { count: passedStepsCount })}
          >
            {passedSteps.map((step) => (
              <Box mt={1} key={step.id}>
                <Grid container alignItems="center" wrap="nowrap" className={classes.select}>
                  <FiCheckCircle className={classes.titleIcon} />
                  <Typography className={`${classes.title} ${classes.selectTitle}`} variant="subtitle2">
                    {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title` })}
                  </Typography>
                </Grid>
              </Box>
            ))}
          </CheckBarExpandableSummary>
        </Box>
      )}
      {failedSteps.map((step) => (
        <Box mt={1} py={0.5} px={1} className={classes.error} key={step.id}>
          <Grid container alignItems="center" wrap="nowrap">
            <IconError />
            <Box ml={1}>{intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title` })}</Box>
          </Grid>
        </Box>
      ))}
      {!!checkingSteps.length && (
        <Box mt={1}>
          <Grid container alignItems="center" wrap="nowrap" className={classes.select}>
            <IconLoad width={17} />
            <Box ml={1}>
              <SkeletonLoader animation="wave" variant="text" width={130} />
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
}
