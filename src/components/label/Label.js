import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CSS from './Label.module.css';

export default function Label({
  type = 'label',
  labelStyle = 'default',
  children,
  ...labelProps
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      type={type}
      className={classNames(CSS.label, labelStyle)}
      {...labelProps} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  labelStyle: PropTypes.string,
  type: PropTypes.string,
};

Label.defaultProps = {
  labelStyle: 'default',
  type: 'label',
};
