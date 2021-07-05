import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  companyName: {
    marginTop: 10,
    width: '100%',
  },
  riskAnalysis: {
    display: 'flex',
    alignItems: 'flex-start',
  },
}));

export const TextFieldInputScore = withStyles({
  input: {
    padding: 10,
  },
  helperText: {
    margin: 0,
  },
})(({ classes, ...props }: any) => (
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
