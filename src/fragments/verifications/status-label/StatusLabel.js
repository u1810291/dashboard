import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import CSS from './StatusLabel.module.scss';

export function StatusLabel({ status, className }) {
  return (
    <span
      className={
        classNames(
          className,
          CSS.coloredText,
          CSS.status,
          status,
        )
      }
    >
      <FormattedMessage id={`statuses.${status}`} />
    </span>
  );
}
