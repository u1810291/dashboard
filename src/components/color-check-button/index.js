import PropTypes from 'prop-types';
import React from 'react';
import CSS from './styles.module.css';

export default function ColorCheckButton({ color, onChange, checked = false }) {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      className={CSS.checkButton}
      data-checked={checked}
      data-color={color}
      onClick={onChange}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
    />
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
