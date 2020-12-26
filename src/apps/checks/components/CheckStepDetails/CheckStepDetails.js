import { Card, CardContent } from '@material-ui/core';
import { CheckText } from 'apps/identity/components/CheckText/CheckText';
import React from 'react';
import { GovCheckText } from '../GovCheckText/GovCheckText';
import { useStyles } from './CheckStepDetails.styles';

export function CheckStepDetails({ step, isGovCheck = false }) {
  const classes = useStyles();

  return (
    <Card raised={false} className={classes.card}>
      <CardContent className={classes.wrapper}>
        {isGovCheck ? (
          <GovCheckText step={step} />
        ) : (
          <CheckText step={step} />
        )}
      </CardContent>
    </Card>
  );
}
