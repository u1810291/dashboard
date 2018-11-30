import React from 'react'
import classNames from 'classnames'
import CSS from './toggle-field.module.scss'

export default function BooleanField({
  onClick = () => {},
  disabled,
  checked = false
}) {
  return (
    <div
      className={classNames(CSS.toggle, { checked, disabled })}
      onClick={() => !disabled && onClick()}
    />
  )
}
