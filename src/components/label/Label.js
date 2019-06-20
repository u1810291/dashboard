import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './Label.module.css'

export default function Label({
  type = 'label',
  labelStyle = 'default',
  children,
  ...labelProps
}) {
  return (
    <label
      type={type}
      className={classNames(CSS.label, labelStyle)}
      {...labelProps}
    >
      {children}
    </label>
  )
}

Label.propTypes = {
  type: PropTypes.string,
  labelStyle: PropTypes.string
}
