import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '80%',
  },
  fullWidth: {
    width: '100%',
  },
  boxBlack: {
    color: theme.palette.text.main,
  },
  submitButton: {
    marginLeft: '10px',
    marginTop: '5px',
  },
}));

export const TextFieldInputScore = withStyles({
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
