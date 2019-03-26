import React from 'react'
import CSS from './ApplicationMenu.scss'

export default function ApplicationMenu({ children }) {
  return <div className={CSS.menu}>{children}</div>
}
