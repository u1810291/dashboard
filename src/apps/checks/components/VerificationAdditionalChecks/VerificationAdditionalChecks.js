import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { AgeCheck } from 'apps/AgeCheck';
import { PhoneValidation } from 'apps/PhoneValidation';
import React from 'react';
import { useIntl } from 'react-intl';
import { DuplicateUserDetectionCheck } from '../DuplicateUserDetectionCheck/DuplicateUserDetectionCheck';
import { useStyles } from './VerificationAdditionalChecks.styles';

export function VerificationAdditionalChecks({ duplicateUserDetectionStep, ageCheck, phoneValidation }) {
  const intl = useIntl();
  const classes = useStyles();
  if (!ageCheck && !duplicateUserDetectionStep && !phoneValidation) { return null; }
  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="subtitle2" className={classes.title}>
            {intl.formatMessage({ id: 'identity.summary.title.additional' })}
          </Typography>
        </Box>
        <Grid container spacing={1}>
          {ageCheck && (
            <Grid item xs={12} lg={4}>
              <AgeCheck stepData={ageCheck} />
            </Grid>
          )}
          {duplicateUserDetectionStep && (
            <Grid item xs={12} lg={4}>
              <DuplicateUserDetectionCheck stepData={duplicateUserDetectionStep} />
            </Grid>
          )}
          {phoneValidation && (
            <Grid item xs={12} lg={4}>
              <PhoneValidation stepData={phoneValidation} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
