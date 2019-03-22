import React from 'react'
import classNames from 'classnames'
import CSS from './ApplicationMenu.scss'

export default function MenuItemSpacer() {
  return <span className={classNames(CSS.menuItemSpacer, CSS.menuItem, 'no-active')} />
}
