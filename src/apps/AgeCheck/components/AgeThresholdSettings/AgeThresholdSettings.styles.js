import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

export const InputScore = withStyles({
  input: {
    '&.MuiInputBase-input': {
      padding: 12,
    },
  },
  helperText: {
    margin: 0,
  },
})(({ classes, ...props }) => (
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
));
