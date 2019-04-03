import React from 'react'
import classNames from 'classnames'
import CSS from './style.scss'

export default function Panel({ children, className }) {
  return <div className={classNames(CSS.panel, className)}>{children}</div>
}

export function PanelBody({
  children,
  className,
  padded = true,
  border,
  smallPadding,
  extraSmallPadding,
  extraPadding
}) {
  return (
    <div
      className={classNames(CSS.panelBody, className, {
        padded,
        smallPadding,
        extraPadding,
        extraSmallPadding,
        [CSS.border]: border,
        [CSS[`border-${border}`]]: border
      })}
    >
      {children}
    </div>
  )
}

Panel.Body = PanelBody
