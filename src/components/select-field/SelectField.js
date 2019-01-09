import React from 'react'
import CSS from './SelectField.scss'
import Select, {components} from 'react-select'
import classNames from 'classnames'
import DownArrow from './downArrow.svg';

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <DownArrow />
    </components.DropdownIndicator>
  )
}

export default function SelectField({
  className,
  error,
  ...inputProps
}) {
  return (
    <Select
      className={classNames(CSS.selectField, error && CSS.error, className)}
      classNamePrefix="select-field"
      components={{DropdownIndicator}}
      {...inputProps}
    />
  )
}
