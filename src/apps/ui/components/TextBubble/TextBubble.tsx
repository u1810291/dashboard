import { Box } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useStyles } from './TextBubble.styles';

export function TextBubble({
  className,
  children,
  qaTag,
}: {
  className?: string;
  children: ReactNode;
  qaTag?: string;
}) {
  const classes = useStyles();

  return (
    <Box className={classNames(classes.root, className)} data-qa={qaTag}>
      {children}
    </Box>
  );
}
