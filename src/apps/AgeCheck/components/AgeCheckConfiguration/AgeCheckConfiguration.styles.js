import { TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
  },
}));

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