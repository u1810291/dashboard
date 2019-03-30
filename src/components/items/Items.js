import React from 'react'
import classNames from 'classnames'
import CSS from './Items.scss'

export default function Items({
  children,
  inline,
  align = 'top',
  template = 'none',
  smallGap,
  className
}) {
  return (
    <div
      className={classNames(CSS.root, `align-${align}`, { inline, smallGap }, className)}
      style={{ gridTemplateColumns: template }}
    >
      {children}
    </div>
  )
}