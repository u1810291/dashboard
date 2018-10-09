import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './Button.css'

export default function Button({
  type = 'button',
  buttonStyle = 'default',
  children,
  className,
  ...buttonProps
}) {
  return (
    <button
      className={classNames(CSS.button, buttonStyle, className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  buttonStyle: PropTypes.string
}
