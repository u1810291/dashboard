import classNames from 'classnames';
import React from 'react';
import CSS from './style.module.scss';

export default function Spinner({ className, size = 'small' }) {
  return (
    <div className={classNames(CSS.spinner, `spinner-${size}`, className)} />
  );
}
