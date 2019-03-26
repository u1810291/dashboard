import React from 'react'
import IconCheckmark from '../../assets/icon-checkmark.svg'
import CSS from './checkbox.module.scss'
import classNames from 'classnames'

export default ({ className, name, label, value, checked, onChange }) => {
  return (
    <div className={classNames(CSS.checkbox, className)}>
      <label className={CSS.checkboxLabel}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        <div className={CSS.checkboxIcon}>
          <IconCheckmark />
        </div>
        <span className={CSS.checkboxTitle}>{label}</span>
      </label>
    </div>
  )
}
