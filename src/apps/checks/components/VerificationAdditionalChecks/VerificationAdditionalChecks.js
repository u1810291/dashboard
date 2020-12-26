import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { DuplicateUserDetectionCheck } from 'apps/checks/components/DuplicateUserDetectionCheck/DuplicateUserDetectionCheck';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './VerificationAdditionalChecks.styles';

export function VerificationAdditionalChecks({ duplicateUserDetectionStep }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <Box p={2}>
            <Box mb={2}>
              <Typography variant="subtitle2" className={classes.title}>
                {intl.formatMessage({ id: 'identity.summary.title.additional' })}
              </Typography>
            </Box>
            <DuplicateUserDetectionCheck stepData={duplicateUserDetectionStep} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
