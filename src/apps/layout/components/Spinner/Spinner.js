import classNames from 'classnames';
import React from 'react';
import CSS from './Spinner.module.scss';

export function Spinner({ className, size = 'small' }) {
  return (
    <div className={classNames(CSS.spinner, `spinner-${size}`, className)} />
  );
}
