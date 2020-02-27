import classNames from 'classnames';
import React from 'react';
import CSS from 'components/Content/Content.module.css';

export function Content({ className, children, fullwidth = true }) {
  return (
    <div className={classNames(CSS.content, className, { fullwidth })}>
      {children}
    </div>
  );
}
