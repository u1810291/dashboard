import React from 'react'
import classNames from 'classnames'
import CSS from './ApplicationBox.css'

export default function ApplicationBox({ children, menu }) {
  return (
    <div className={CSS.box}>
      {menu}
      <div className={classNames(CSS.contentWrapper, 'router--scroll-to-top')}>{children}</div>
    </div>
  )
}

export function Content({ className, children, fullwidth = true }) {
  return <div className={classNames(CSS.content, className, { fullwidth })}>{children}</div>
}
