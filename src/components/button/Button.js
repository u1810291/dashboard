import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import CSS from './Button.module.css'

function ButtonElement({ href, external, children, ...props }) {
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  if (href) {
    return (
      <NavLink to={href} {...props}>
        {children}
      </NavLink>
    )
  } else {
    return <button {...props}>{children}</button>
  }
}

export default function Button({
  type = 'button',
  buttonStyle = 'default',
  size = 'default',
  children,
  className,
  ...buttonProps
}) {
  return (
    <ButtonElement
      className={classNames(CSS.button, size, buttonStyle, className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </ButtonElement>
  )
}
