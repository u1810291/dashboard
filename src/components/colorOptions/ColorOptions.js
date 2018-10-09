import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './ColorOptions.css'

export default function ColorOptions({
  color = 'blue',
  colorOptionsStyle = '',
  children
}) {
  return (
    <div
      className = { classNames(CSS.colorOptions, colorOptionsStyle) }
    >
      <div className={ classNames(CSS.colorExample, color) }></div>
      { children }
    </div>
  )
}

ColorOptions.propTypes = {
  color: PropTypes.string,
  colorOptionsStyle: PropTypes.string
}
