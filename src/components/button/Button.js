import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import CSS from './Button.module.css';

function ButtonElement({ href, external, children, ...props }) {
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      >
        {children}
      </a>
    );
  }
  if (href) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <NavLink to={href} {...props}>
        {children}
      </NavLink>
    );
  } else {
    return (
      <button
        type="button"
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      >
        {children}
      </button>
    );
  }
}

export default function Button({
  type = 'button',
  buttonStyle = 'default',
  size = 'default',
  children,
  className,
  ...buttonProps
}) {
  return (
    <ButtonElement
      className={classNames(CSS.button, size, buttonStyle, className)}
      type={type}
      {...buttonProps} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </ButtonElement>
  );
}

ButtonElement.propTypes = {
  external: PropTypes.bool,
  href: PropTypes.string,
};

ButtonElement.defaultProps = {
  external: false,
  href: '',
};

Button.propTypes = {
  buttonStyle: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  buttonStyle: 'default',
  size: 'default',
  type: 'button',
};
