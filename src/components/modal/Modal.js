import React from 'react'
import classNames from 'classnames'
import CSS from './Modal.css'

export default function Modal({ children, className, wide = false, ...props }) {
  return (
    <div className={classNames(CSS.window, className, { wide })} data-role="modal" {...props}>
      {children}
    </div>
  )
}
