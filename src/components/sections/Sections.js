import React from 'react'
import classNames from 'classnames'
import CSS from './Sections.scss'

export default function Sections({ children, withBorder = false, extraGap = false }) {
  return <div className={classNames(CSS.root, { withBorder, extraGap })}>{children}</div>
}
