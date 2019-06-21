import React from 'react'
import classNames from 'classnames'
import CSS from './Modal.module.css'

export default function Modal({ children, className, wide = false, small = false, ...props }) {
  return (
    <div
      className={classNames(CSS.window, className, { wide, small })}
      data-role="modal"
      {...props}
    >
      {children}
    </div>
  )
}
