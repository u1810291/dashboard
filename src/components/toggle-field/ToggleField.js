import React from 'react'
import classNames from 'classnames'
import CSS from './toggle-field.module.scss'

export default function ToggleField({
  onClick = () => {},
  disabled = false,
  checked = false
}) {
  return (
    <div
      className={classNames(CSS.toggle, { checked, disabled })}
      onClick={() => !disabled && onClick(!checked)}
    />
  )
}
