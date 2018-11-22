import React from 'react'
import classNames from 'classnames'
import CSS from './style.css'

export default function Panel({ caption, children }) {
  return (
    <div className={CSS.panel}>
      {caption ? <h5>{caption}</h5> : null}
      <div>{children}</div>
    </div>
  )
}

export function PanelBody({ children, padded = true }) {
  return <div className={classNames('panel-body', CSS.panelBody, { padded })}>{children}</div>
}

export function PanelHeader({ children }) {
  return <div className={CSS.panelHeader}>{children}</div>
}

Panel.Body = PanelBody
Panel.Header = PanelHeader
