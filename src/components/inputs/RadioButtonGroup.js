import React from 'react'
import RadioButtonGroupField from 'src/components/radio-button-group-field'
import BaseInput from './BaseInput'

export const RadioButtonGroup = props => (
  <BaseInput {...props} renderer={fieldProps => (<RadioButtonGroupField {...fieldProps} />)} />
)