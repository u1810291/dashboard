import React from 'react'
import CSS from './SelectField.scss'
import Select, { components } from 'react-select'
import classNames from 'classnames'
import { ReactComponent as DownArrow } from './downArrow.svg'

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <DownArrow />
      </components.DropdownIndicator>
    )
  )
}

export default function SelectField({
  className,
  error,
  onChange,
  value,
  options,
  ...inputProps
}) {
  function onSelectChange({ value }) {
    onChange({
      target: {
        name: inputProps.name,
        value
      }
    })
  }
  return (
    <Select
      className={classNames(CSS.selectField, error && CSS.error, className)}
      classNamePrefix="select-field"
      components={{ DropdownIndicator }}
      onChange={onSelectChange}
      options={options}
      value={options.find(o => o.value === value)}
      {...inputProps}
    />
  )
}
