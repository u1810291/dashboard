import React from 'react'
import classNames from 'classnames'
import CSS from './ApplicationBox.css'

export default function ApplicationBox({ children, menu }) {
  return (
    <div className={CSS.box}>
      {menu}
      <div className={classNames(CSS.contentWrapper, 'router--scroll-to-top')}>
        <div className={CSS.contentSubWrapper}>{children}</div>
      </div>
    </div>
  )
}

export function Sidebar(props) {
  return <div className={classNames(CSS.sidebar, props.className)}>{props.children}</div>
}

export function Content(props) {
  return <div className={classNames(CSS.content, props.className)}>{props.children}</div>
}
