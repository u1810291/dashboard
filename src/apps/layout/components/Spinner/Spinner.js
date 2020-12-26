import classnames from 'classnames';
import React from 'react';
import { useStyles } from './Spinner.styles';

export function Spinner({ className, size = 'small' }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.spinner, `spinner-${size}`, className)} />
  );
}
