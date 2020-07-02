import { Box, Paper, Typography } from '@material-ui/core';
import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CheckBarTip.styles';

export function CheckBarTip({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  const isMessage = step.checkStatus === StepStatus.Failure;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title`, defaultMessage: ' ' })}
      </Typography>
      <Box fontSize={12} mt={1}>
        {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.tip.body`, defaultMessage: ' ' })}
      </Box>
      {isMessage && (
        <Box fontSize={12} mt={1}>
          <Paper
            elevation={0}
            className={[classes.tipMessage, classes[step.checkStatus]].join(' ')}
          >
            {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.tip.message.${step.checkStatus}`, defaultMessage: ' ' })}
          </Paper>
        </Box>
      )}
    </div>
  );
}
