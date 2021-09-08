import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { isNil } from 'lib/isNil';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { EmailValidationFields, EmailValidationExtra } from 'models/EmailValidation.model';
import { useStyles } from './EmailValidation.styles';

export function EmailValidation({ step }: { step: EmailValidationExtra }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!step) {
    return null;
  }

  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={step} title="SecurityCheckStep.emailOwnership.title">
        <Card raised={false} className={classes.card}>
          <CardContent>
            {step.error && (
              <Box>
                {intl.formatMessage({ id: `SecurityCheckStep.${step.error.code}` })}
              </Box>
            )}
            {step.data && (
              <Box mt={0.5}>
                <Grid container>
                  {EmailValidationFields.map(({ fieldName, inline }) => (!isNil(step?.data[fieldName])) && (
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
