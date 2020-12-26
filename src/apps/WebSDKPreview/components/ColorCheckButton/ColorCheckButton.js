import React from 'react';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import CSS from './styles.module.css';

export function ColorCheckButton({ color = 'blue', onChange, checked = false }) {
  const intl = useIntl();

  return (
    <div
      className={CSS.pair}
      onClick={onChange}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
    >
      <div
        className={CSS.checkButton}
        data-checked={checked}
        data-color={color}
      />
      <Typography align="left">{intl.formatMessage({ id: `color.${color}` })}</Typography>
    </div>
  );
}
