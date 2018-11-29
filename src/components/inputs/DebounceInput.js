import React from 'react'
import { DebounceInput } from 'react-debounce-input'
import BaseInput from './BaseInput'
import CSS from '../text-field/TextField.css'

export default props => (
  <BaseInput
    {...props}
    renderer={fieldProps => (
      <DebounceInput
        className={CSS.textField}
        debounceTimeout={props.debounceTimeout || 300}
        {...fieldProps}
      />
    )}
  />
)
