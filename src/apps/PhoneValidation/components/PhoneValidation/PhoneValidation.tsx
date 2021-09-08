import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { isNil } from 'lib/isNil';
import { PhoneValidationTypes, PhoneValidationStep } from '../../models/PhoneValidation.model';
import { useStyles } from './PhoneValidation.styles';

export function PhoneValidation({ step }: { step: PhoneValidationStep }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!step) {
    return null;
  }

  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={step} title="SecurityCheckStep.phoneOwnership.title" isOpenByDefault>
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
                  {Object.keys(PhoneValidationTypes).map((fieldName) => (!isNil(step?.data[PhoneValidationTypes[fieldName]])) && (
                    <Grid xs={6} item key={PhoneValidationTypes[fieldName]}>
                      <CheckStepDetailsEntry label={PhoneValidationTypes[fieldName]} value={step.data[PhoneValidationTypes[fieldName]]} />
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
