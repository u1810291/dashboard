import React from 'react'
import classNames from 'classnames'
import CSS from './Sections.scss'

export default function Sections({
  children,
  extraGap = false,
  smallGap = false,
  className
}) {
  return (
    <div className={classNames(CSS.root, { extraGap, smallGap }, className)}>
      {children}
    </div>
  )
}
