import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CSS from './TextField.module.css';

export default function TextField({
  type = 'text',
  className,
  error,
  ...inputProps
}) {
  return (
    <input
      className={classNames(CSS.textField, error && CSS.error, className)}
      type={type}
      {...inputProps} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
}

TextField.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  type: PropTypes.string,
};

TextField.defaultProps = {
  error: undefined,
  type: 'text',
};
