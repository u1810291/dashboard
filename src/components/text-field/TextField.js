import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './TextField.css'

export default function Button({
  type = 'text',
  className,
  ...inputProps
}) {
  return (
    <input
      className={classNames(CSS.textField, className)}
      type={type}
      {...inputProps}
    />
  )
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
}
