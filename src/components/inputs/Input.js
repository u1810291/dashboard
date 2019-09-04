import React from 'react';
import TextField from 'components/text-field';
import BaseInput from './BaseInput';

export default (props) => (
  <BaseInput
    {...props}
    renderer={
      (fieldProps) => (
        <TextField
          {...fieldProps} // eslint-disable-line react/jsx-props-no-spreading
        />
      )
    }
  />
);
