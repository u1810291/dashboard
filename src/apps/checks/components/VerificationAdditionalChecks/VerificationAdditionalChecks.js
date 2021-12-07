import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { AgeCheck } from 'apps/AgeCheck';
import { PhoneValidation } from 'apps/PhoneValidation';
import React from 'react';
import { useIntl } from 'react-intl';
import { RiskAnalysis } from 'apps/RiskAnalysis';
import { EmailValidation } from 'apps/EmailValidation/components/EmailValidation/EmailValidation';
import { EmailRisk } from 'apps/EmailRisk/components/EmailRisk';
import { BoxBordered } from 'apps/ui';
import { DuplicateUserDetectionCheck } from 'apps/checks/components/DuplicateUserDetectionCheck/DuplicateUserDetectionCheck';
import { useStyles } from './VerificationAdditionalChecks.styles';

export function VerificationAdditionalChecks({ duplicateUserDetectionStep, ageCheck, phoneValidation, riskAnalysis, emailValidationStep, emailRiskStep }) {
  const intl = useIntl();
  const classes = useStyles();
  if (!(ageCheck || duplicateUserDetectionStep || phoneValidation || riskAnalysis || emailValidationStep || emailRiskStep)) {
    return null;
  }
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
              <BoxBordered p={1} pt={2} className={classes.bordered}>
                <AgeCheck stepData={ageCheck} />
              </BoxBordered>
            </Grid>
          )}
          {duplicateUserDetectionStep && (
            <Grid item xs={12} lg={4}>
              <BoxBordered p={1} pt={2} className={classes.bordered}>
                <DuplicateUserDetectionCheck withLegacyVerificationDetailsLink stepData={duplicateUserDetectionStep} />
              </BoxBordered>
            </Grid>
          )}
          {phoneValidation && (
            <Grid item xs={12} lg={4}>
              <PhoneValidation step={phoneValidation} />
            </Grid>
          )}
          {riskAnalysis && (
            <Grid item xs={12} lg={4}>
              <RiskAnalysis step={riskAnalysis} />
            </Grid>
          )}
          {emailValidationStep && (
            <Grid item xs={12} lg={4}>
              <EmailValidation step={emailValidationStep} />
            </Grid>
          )}
          {emailRiskStep && (
            <Grid item xs={12} lg={4}>
              <EmailRisk step={emailRiskStep} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
