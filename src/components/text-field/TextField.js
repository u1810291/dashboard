import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './TextField.module.css'

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
      {...inputProps}
    />
  )
}

TextField.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
}
