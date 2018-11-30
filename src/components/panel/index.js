import React from 'react'
import classNames from 'classnames'
import CSS from './style.scss'

export default function Panel({ caption, children, className }) {
  return (
    <div className={classNames(CSS.panel, className)}>
      {caption ? <h5>{caption}</h5> : null}
      {children}
    </div>
  )
}

export function PanelBody({ children, className, padded = true }) {
  return (
    <div className={classNames(CSS.panelBody, className, { padded })}>
      {children}
    </div>
  )
}

export function PanelHeader({ children, className }) {
  return (
    <div className={classNames(CSS.panelHeader, className)}>{children}</div>
  )
}

Panel.Body = PanelBody
Panel.Header = PanelHeader
