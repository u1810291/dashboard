import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { useStyles } from './PhoneValidation.styles';
import { PhoneValidationFields } from '../../models/PhoneValidation.model';

export function PhoneValidation({ stepData = {} }) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={stepData} title="SecurityCheckStep.phoneOwnership.title">
        <Card raised={false} className={classes.card}>
          <CardContent>
            {stepData.error && (
              <Box>
                {intl.formatMessage({ id: `SecurityCheckStep.${stepData.error.code}` })}
              </Box>
            )}
            <Box mt={0.5}>
              <Grid container>
                {PhoneValidationFields.map((fieldName) => (stepData?.data[fieldName] !== undefined && stepData?.data[fieldName] !== null)
                  && (
                    <Grid xs={6} item>
                      <CheckStepDetailsEntry label={fieldName} value={stepData.data[fieldName]} key={fieldName} />
                    </Grid>
                  ),
                )}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </CheckBarExpandable>
    </BoxBordered>
  );
}
