import React from 'react'
import Card from 'src/components/card'
import BooleanField from 'src/components/boolean-field'
import CSS from './styles.css'

export default function({
  allowIndeterminateState = false,
  checked = false,
  indeterminate = false,
  label = '',
  onChange = () => {}
}) {
  const handleCheck = () => {
    onChange({
      checked: !checked,
      indeterminate: indeterminate && !checked
    })
  }
  const handleIndeterminate = () => {
    onChange({
      checked: true,
      indeterminate: !indeterminate
    })
  }
  return (
    <Card
      cardBorderStyle={checked ? 'selected' : 'default'}
      className={CSS.button}
      onClick={handleCheck}
    >
      <BooleanField
        onChange={handleCheck}
        onClick={event => event.stopPropagation()}
        checked={checked}
        label={label}
      />
      {allowIndeterminateState && (
        <BooleanField
          onChange={handleIndeterminate}
          onClick={event => { event.preventDefault(); event.stopPropagation() }}
          indeterminate={indeterminate}
        />
      )}
    </Card>
  )
}
