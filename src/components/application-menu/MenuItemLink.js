import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import CSS from './ApplicationMenu.scss'

export default function MenuItemLink({
  children,
  to,
  label,
  icon,
  external = false,
  noActive = false
}) {
  const Wrapper = ({ external, noActive, ...props }) => {
    if (props.to) {
      if (external) {
        return (
          <a {...props} href={props.to} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        )
      } else {
        return <NavLink {...props} exact activeClassName="active" />
      }
    } else {
      return <span {...props} />
    }
  }

  return (
    <Wrapper
      className={classNames(CSS.menuItem, { 'no-active': noActive })}
      to={to}
      external={external}
    >
      {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
      {label && <span className={CSS.menuItemLabel}>{label}</span>}
      {children}
    </Wrapper>
  )
}
