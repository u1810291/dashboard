import { Box, Grid } from '@material-ui/core';
import { CheckStepDetails } from 'apps/checks';
import { CheckBarExpandable } from 'apps/ui';
import { BiometricStep } from 'models/Biometric.model';
import React, { ReactNode } from 'react';
import { useStyles } from './LivenessConslusion.styles';

export function LivenessConslusion({
  steps,
  children,
}: {
  steps: BiometricStep[];
  children?: ReactNode;
}) {
  const classes = useStyles();

  return (
    <Box className={classes.status}>
      <Box mx={{ xs: 'auto', xl: 0.7 }}>
        {children}
      </Box>
      <Grid container spacing={1}>
        {steps.map((step) => (
          <Grid key={step.id} item xs={12} xl={5}>
            <CheckBarExpandable step={step}>
              <CheckStepDetails step={step} />
            </CheckBarExpandable>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
