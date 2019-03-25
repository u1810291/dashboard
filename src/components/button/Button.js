import React from 'react'
import classNames from 'classnames'
import CSS from './Button.css'

function ButtonElement({ href, children, ...props }) {
  if (href) {
    const extraProps = {}
    if (href.match('^http[s]?:')) {
      extraProps.target = '_blank'
    }
    return (
      <a href={href} {...extraProps} {...props}>
        {children}
      </a>
    )
  } else {
    return <button {...props}>{children}</button>
  }
}

export default function Button({
  type = 'button',
  buttonStyle = 'default',
  children,
  className,
  ...buttonProps
}) {
  return (
    <ButtonElement
      className={classNames(CSS.button, buttonStyle, className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </ButtonElement>
  )
}
