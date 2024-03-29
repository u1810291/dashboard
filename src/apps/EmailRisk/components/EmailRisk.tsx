import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { isNil } from 'lib/isNil';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { EmailRiskFields, EmailRiskStep } from 'models/EmailCheck.model';
import { useStyles } from './EmailRisk.styles';

export function EmailRisk({ step }: { step: EmailRiskStep }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!step) {
    return null;
  }

  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={step} title="SecurityCheckStep.emailRisk.title">
        <Card raised={false} className={classes.card}>
          <CardContent>
            {step.error && (
              <Box>
                {intl.formatMessage({ id: `SecurityCheckStep.${step.error.code}`, defaultMessage: intl.formatMessage({ id: 'Error.common' }) }, {
                  email: step.data?.emailAddress,
                })}
              </Box>
            )}
            {step.data && (
              <Box mt={0.5}>
                <Grid container>
                  {EmailRiskFields.map(({ fieldName, inline }) => (!isNil(step?.data[fieldName])) && (
                    <Grid xs={inline ? 6 : 12} item key={fieldName}>
                      <CheckStepDetailsEntry label={fieldName} value={step.data[fieldName]} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </CheckBarExpandable>
    </BoxBordered>
  );
}
