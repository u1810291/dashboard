import React from 'react'
import classNames from 'classnames'
import CSS from './Items.scss'

export default function Items({
  children,
  inline,
  align = 'top',
  template = 'none',
  smallGap,
  extraGap,
  className
}) {
  return (
    <div
      className={classNames(
        CSS.root,
        `align-${align}`,
        { inline, smallGap, extraGap },
        className
      )}
      style={{ gridTemplateColumns: template }}
    >
      {children}
    </div>
  )
}
