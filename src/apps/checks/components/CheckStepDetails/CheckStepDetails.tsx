import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { CheckText } from 'apps/identity';
import React, { ReactNode } from 'react';
import { IStep } from 'models/Step.model';
import { useStyles } from './CheckStepDetails.styles';

export function CheckStepDetails({ step, children }: {
  step?: IStep;
  children?: ReactNode;
}) {
  const classes = useStyles();

  return (
    <Card raised={false} className={classes.card}>
      <CardContent className={classes.wrapper}>
        {children || <CheckText step={step} />}
      </CardContent>
    </Card>
  );
}
