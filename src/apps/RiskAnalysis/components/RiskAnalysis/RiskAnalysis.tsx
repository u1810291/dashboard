import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { isNil } from 'lib/isNil';
import { RiskAnalysisFieldTypes, RiskAnalysisStep } from '../../models/RiskAnalysis.model';
import { useStyles } from './RiskAnalysis.styles';

export interface RiskAnalysisProps {
  step: RiskAnalysisStep;
}

export function RiskAnalysis({ step }: RiskAnalysisProps) {
  const classes = useStyles();
  const intl = useIntl();

  if (!step) {
    return null;
  }

  return (
    <Box p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={step} title="Checks.result.riskAnalysis.title">
        <Card raised={false} className={classes.card}>
          <CardContent>
            {step.error && (
              <Box>
                {intl.formatMessage({
                  id: `Checks.result.riskAnalysis.${step.error.code}`,
                  defaultMessage: intl.formatMessage({ id: 'Error.common' }),
                })}
              </Box>
            )}
            <Box mt={0.5}>
              <Grid container>
                {Object.keys(RiskAnalysisFieldTypes).map((fieldName) => (!isNil(step?.data[RiskAnalysisFieldTypes[fieldName]])) && (
                  <Grid xs={6} item key={RiskAnalysisFieldTypes[fieldName]}>
                    <CheckStepDetailsEntry label={RiskAnalysisFieldTypes[fieldName]} value={step.data[RiskAnalysisFieldTypes[fieldName]]} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </CheckBarExpandable>
    </Box>
  );
}
