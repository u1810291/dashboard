import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { DuplicateUserDetectionCheck } from 'apps/checks/components/DuplicateUserDetectionCheck/DuplicateUserDetectionCheck';
import React from 'react';
import { useIntl } from 'react-intl';
import { AgeCheck } from 'apps/additionalChecks/ageCheck/AgeCheck';
import { useStyles } from './VerificationAdditionalChecks.styles';

export function VerificationAdditionalChecks({ duplicateUserDetectionStep, ageCheck }) {
  const intl = useIntl();
  const classes = useStyles();
  if (!(ageCheck || duplicateUserDetectionStep)) { return null; }
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
        </Grid>
      </Box>
    </Paper>
  );
}
