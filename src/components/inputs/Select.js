import React from 'react';
import SelectField from 'components/select-field';
import BaseInput from './BaseInput';

export default (props) => (
  <BaseInput
    {...props}
    renderer={
      (fieldProps) => (
        <SelectField
          {...fieldProps} // eslint-disable-line react/jsx-props-no-spreading
        />
      )
    }
  />
);
