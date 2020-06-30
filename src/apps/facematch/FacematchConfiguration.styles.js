import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../app.theme';

export const InputScore = withStyles({
  input: {
    padding: 10,
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

export const BoxRoundBordered = ((props) => (
  <Box
    p={1}
    border={1}
    borderRadius={AppTheme.shape.borderRadius}
    borderColor={AppTheme.palette.common.lightgray}
    {...props}
  />
));
