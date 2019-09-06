import React from 'react';
import classNames from 'classnames';
import CSS from './ContentPreloader.module.scss';

export default ({ className }) => (
  <div className={classNames(CSS.contentPreloader, className)}>
    <div className={CSS.progress} />
    <div className={CSS.progress} />
    <div className={CSS.progress} />
  </div>
);
