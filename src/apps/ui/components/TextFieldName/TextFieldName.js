import { TextField } from '@material-ui/core';
import React from 'react';
import { useStyles } from './TextFieldName.styles';

export function TextFieldName({ ...props }) {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      InputProps={{
        classes: {
          input: classes.input,
        },
      }}
      FormHelperTextProps={{
        classes: {
          root: classes.helperText,
        },
      }}
      {...props}
    />
  );
}
