import React from 'react'
import classNames from 'classnames'
import CSS from './BooleanField.css'

export default function BooleanField({
  label,
  className,
  hidden,
  onChange = () => {},
  onClick = () => {},
  ...inputProps
}) {
  return (
    <label
      hidden={hidden}
      onClick={event => onClick(event, event.currentTarget.querySelector('input').checked)}
    >
      <input
        className={classNames(CSS.booleanField, className)}
        type="checkbox"
        onChange={onChange}
        {...inputProps}
      />
      {' '}
      {label}
    </label>
  )
}
