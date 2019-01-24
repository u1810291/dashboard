import React from 'react'
import classNames from 'classnames'
import CSS from './Modal.css'

export default function Modal({ children, className, wide = false }) {
  return (
    <div className={classNames(CSS.window, className, { wide })}>
      {children}
    </div>
  )
}
