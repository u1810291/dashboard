import React from 'react'
import classNames from 'classnames'
import CSS from './ApplicationMenu.module.scss'

export default function MenuItemButton({
  children,
  label,
  icon,
  ...buttonProps
}) {
  return (
    <span className={classNames(CSS.menuItem)} {...buttonProps}>
      {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
      {label && <span>{label}</span>}
      {children}
    </span>
  )
}
