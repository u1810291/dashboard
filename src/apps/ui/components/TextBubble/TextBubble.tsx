import { Box } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useStyles } from './TextBubble.styles';

export function TextBubble({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const classes = useStyles();

  return (
    <Box className={classNames(classes.root, className)}>
      {children}
    </Box>
  );
}
