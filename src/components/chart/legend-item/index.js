import React from 'react'
import classNames from 'classnames'
import CSS from './style.scss'

export default ({ color, label, value }) => {
  return (
    <div className={CSS.legendItem}>
      <span className={classNames(CSS.legendItemLabel, color)}>{label}:</span>
      {value ? <strong>{value}</strong> : null}
    </div>
  )
}
