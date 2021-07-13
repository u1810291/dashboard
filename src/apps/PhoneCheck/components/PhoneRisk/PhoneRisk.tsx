import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { CheckBarExpandable, BoxBordered } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { isNil } from 'lib/isNil';
import { PhoneRiskStep, PhoneRiskFieldTypes } from 'models/PhoneCheck.model';
import { useStyles } from './PhoneRisk.styles';

export function PhoneRisk({ step }: {
  step: PhoneRiskStep;
}) {
  const classes = useStyles();
  const intl = useIntl();

  if (!step) {
    return null;
  }

  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={step} title="Checks.result.PhoneRisk.title">
        <Card raised={false} className={classes.card}>
          <CardContent>
            {step.error && (
              <Box>
                {intl.formatMessage({
                  id: `Checks.result.PhoneRisk.${step.error.code}`,
                  defaultMessage: intl.formatMessage({ id: 'Error.common' }),
                })}
              </Box>
            )}
            <Box mt={0.5}>
              <Grid container>
                {Object.keys(PhoneRiskFieldTypes).map((fieldName) => (!isNil(step?.data[PhoneRiskFieldTypes[fieldName]])) && (
                  <Grid xs={6} item key={PhoneRiskFieldTypes[fieldName]}>
                    <CheckStepDetailsEntry label={PhoneRiskFieldTypes[fieldName]} value={step.data[PhoneRiskFieldTypes[fieldName]]} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </CheckBarExpandable>
    </BoxBordered>
  );
}
