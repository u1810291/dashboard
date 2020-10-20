import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { useStyles } from './CheckStepDetails.styles';
import { useCheckText, useGovCheckText } from '../../hooks/step.hook';

export function CheckStepDetails({ step }) {
  const classes = useStyles();
  const checkText = useCheckText(step);

  return (
    <Card raised={false} className={classes.card}>
      <CardContent className={classes.wrapper}>
        {checkText}
      </CardContent>
    </Card>
  );
}

export function GovCheckStepDetails({ step }) {
  const classes = useStyles();
  const checkText = useGovCheckText(step);

  return (
    <Card raised={false} className={classes.card}>
      <CardContent className={classes.wrapper}>
        {checkText}
      </CardContent>
    </Card>
  );
}
