import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { useStyles } from './CheckStepDetails.styles';
import { CheckText } from '../CheckText/CheckText';
import { GovCheckText } from '../GovCheckText/GovCheckText';

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
