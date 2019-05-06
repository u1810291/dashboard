import React from 'react'
import SelectField from 'components/select-field'
import BaseInput from './BaseInput'

export const Select = props => (
  <BaseInput {...props} renderer={fieldProps => (<SelectField {...fieldProps} />)} />
)
