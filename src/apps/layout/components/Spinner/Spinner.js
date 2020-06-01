import clsx from 'clsx';
import React from 'react';
import { useStyles } from './Spinner.styles';

export function Spinner({ className, size = 'small' }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.spinner, `spinner-${size}`, className)} />
  );
}
