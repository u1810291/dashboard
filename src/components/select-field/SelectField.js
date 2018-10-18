import React from 'react'
import classNames from 'classnames'
import './SelectField.css'

export default function SelectField({
  className,
  children,
  ...inputProps
}) {
  return (
    <div className="mgi-select-field--wrapper">
      <select
        className={classNames('mgi-select-field', className)}
        {...inputProps}
      >
        {children}
      </select>
    </div>
  )
}
