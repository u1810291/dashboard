import classnames from 'classnames';
import React from 'react';
import { useStyles } from './Spinner.styles';

export function Spinner({ className, size = 'small' }: { className?: string; size?: 'small' | 'large' }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.spinner, `spinner-${size}`, className)} />
  );
}
