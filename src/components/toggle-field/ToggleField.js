import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import CSS from './toggle-field.module.scss';

export default function ToggleField({ checked, disabled, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      className={classNames(CSS.toggle, { checked, disabled })}
      onClick={() => !disabled && onClick(!checked)}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
    />
  );
}

ToggleField.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ToggleField.defaultProps = {
  checked: false,
  disabled: false,
  onClick: () => {},
};
