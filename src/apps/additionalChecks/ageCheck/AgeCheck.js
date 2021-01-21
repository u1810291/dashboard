import { Box, Card, CardContent } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './AgeCheck.styles';

export function AgeCheck({ stepData = {} }) {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <BoxBordered p={1} pt={2} className={classes.bordered}>
      <CheckBarExpandable step={stepData} title={`Checks.result.ageCheck.${stepData.checkStatus}.title`}>
        <Card raised={false} className={classes.card}>
          <CardContent>
            <Box>
              {intl.formatMessage({ id: `Checks.result.ageCheck.${stepData.checkStatus}.description` },
                { threshold: stepData?.data?.ageThreshold },
              )}
            </Box>
          </CardContent>
        </Card>
      </CheckBarExpandable>
    </BoxBordered>
  );
}
