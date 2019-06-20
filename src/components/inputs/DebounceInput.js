import React from 'react'
import { DebounceInput } from 'react-debounce-input'
import BaseInput from './BaseInput'
import classNames from 'classnames'
import CSS from '../text-field/TextField.module.css'

export default props => (
  <BaseInput
    {...props}
    renderer={fieldProps => (
      <DebounceInput
        className={classNames(CSS.textField, fieldProps.error && CSS.error)}
        debounceTimeout={props.debounceTimeout || 300}
        {...fieldProps}
      />
    )}
  />
)
