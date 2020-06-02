import classNames from 'classnames';
import React from 'react';
import CSS from './Content.module.scss';

/**
 * @deprecated
 */
export function Content({ className, children, fullwidth = true }) {
  return (
    <div className={classNames(CSS.content, className, {
      [CSS.fullwidth]: fullwidth,
    })}
    >
      {children}
    </div>
  );
}
