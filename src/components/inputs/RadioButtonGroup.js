import React from 'react';
import RadioButtonGroupField from 'components/radio-button-group-field';
import BaseInput from './BaseInput';

export default (props) => (
  <BaseInput
    {...props}
    renderer={
      (fieldProps) => (
        <RadioButtonGroupField
          {...fieldProps} // eslint-disable-line react/jsx-props-no-spreading
        />
      )
    }
  />
);
