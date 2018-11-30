import React from 'react'
import classNames from 'classnames'
import CSS from './style.scss'

export default ({ className, size = 'small' }) => {
  return (
    <div className={classNames(CSS.spinner, `spinner-${size}`, className)} />
  )
}
