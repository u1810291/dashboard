import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from './CircledContent.styles';

interface CircledContentProps {
  color?: string;
  width?: string;
  height?: string;
  children: ReactNode;
}

export function CircledContent({ color, width, height, children }: CircledContentProps) {
  const classes = useStyles({ color, width, height });

  return (
    <Grid container wrap="nowrap" alignItems="center" justify="center" className={classes.circledContent}>
      {children}
    </Grid>
  );
}

CircledContent.defaultProps = {
  color: '',
  width: null,
  height: null,
};
