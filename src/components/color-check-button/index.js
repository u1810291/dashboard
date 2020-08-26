/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'components';
import { useIntl } from 'react-intl';
import CSS from './styles.module.css';

export default function ColorCheckButton({ color, onChange, checked = false }) {
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
      <Text capitalize align="left">{intl.formatMessage({ id: `color.${color}` })}</Text>
    </div>
  );
}

ColorCheckButton.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  onChange: PropTypes.func,
};

ColorCheckButton.defaultProps = {
  checked: false,
  color: 'blue',
  onChange: () => {},
};
