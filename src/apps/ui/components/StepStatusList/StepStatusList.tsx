import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { useStyles } from './StepStatusList.styles';
import { StepStatus } from './StepStatus';

export type StepType = { id: string, text: string, disabled?: boolean };

interface StepStatusListProps {
  className?: string;
  steps: StepType[];
}

export function StepStatusList({ steps, className }: StepStatusListProps) {
  const classes = useStyles({ fullWidth: steps.length <= 4 });

  return (
    <List className={`${classes.stepStatusList} ${className}`}>
      {steps.map((step) => (
        <ListItem key={step.id} className={classes.stepStatusListItem}>
          <StepStatus text={step.text} disabled={step?.disabled} />
        </ListItem>
      ))}
    </List>
  );
}

StepStatusList.defaultProps = {
  className: null,
};
