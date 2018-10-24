import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CSS from './ApplicationBox.css'

export default function ApplicationBox({
  sidebarItems = [],
  children
}) {
  return (
    <div className={CSS.box}>
      <div className={CSS.menu}>
        {sidebarItems}
      </div>
      <div className={classNames(CSS.contentWrapper, 'router--scroll-to-top')}>
        <div className={CSS.contentSubWrapper}>
          {children}
        </div>
      </div>
    </div>
  )
}

ApplicationBox.propTypes = {
  sidebarItems: PropTypes.array,
  children: PropTypes.node
}

export function Sidebar(props) {
  return (
    <div className={classNames(CSS.sidebar, props.className)}>
      {props.children}
    </div>
  )
}

export function Content(props) {
  return (
    <div className={classNames(CSS.content, props.className)}>
      {props.children}
    </div>
  )
}