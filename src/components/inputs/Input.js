import React from 'react'
import TextField from 'src/components/text-field'
import BaseInput from './BaseInput'

export const Input = props => (
  <BaseInput {...props} renderer={fieldProps => <TextField {...fieldProps} />} />
)
