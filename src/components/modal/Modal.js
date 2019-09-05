import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import CSS from './Modal.module.css';

export default function Modal({ children, className, wide = false, small = false, ...props }) {
  return (
    <div
      className={classNames(CSS.window, className, { wide, small })}
      data-role="modal"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </div>
  );
}

Modal.propTypes = {
  small: PropTypes.bool,
  wide: PropTypes.bool,
};

Modal.defaultProps = {
  small: false,
  wide: false,
};
