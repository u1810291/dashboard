import { Box, Card, CardContent } from '@material-ui/core';
import { CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from 'apps/AgeCheck/components/AgeCheck/AgeCheck.styles';
import { IStep } from 'models/Step.model';

export function AgeCheck({ stepData }: { stepData: IStep }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!stepData) {
    return null;
  }

  return (
    <CheckBarExpandable step={stepData} title={`Checks.result.ageCheck.${stepData.checkStatus}.title`} isNoBadge>
      <Card raised={false} className={classes.card}>
        <CardContent>
          <Box>
            {intl.formatMessage({ id: `Checks.result.ageCheck.${stepData.checkStatus}.description` }, {
              threshold: stepData.data?.ageThreshold,
            })}
          </Box>
        </CardContent>
      </Card>
    </CheckBarExpandable>
  );
}
