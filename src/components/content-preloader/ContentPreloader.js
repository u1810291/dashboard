import React from 'react'
import classNames from 'classnames'
import CSS from './ContentPreloader.scss'

export default ({ className }) => {
  return (
    <div className={classNames(CSS.contentPreloader, className)}>
      <div className={CSS.progress} />
      <div className={CSS.progress} />
      <div className={CSS.progress} />
    </div>
  )
}
