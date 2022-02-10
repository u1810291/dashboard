import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.common.black7,
  },
}));

export const TextFieldInputScore = withStyles((theme) => ({
  input: {
    '&.MuiInputBase-input': {
      padding: '10px 0px 10px 10px',
    },
    'input.MuiOutlinedInput-root': {
      color: theme.palette.common.black50,
    },
  },
  helperText: {
    margin: 0,
  },
  notchedOutline: {
    borderColor: `${theme.palette.common.black50} !important`,
  },
}))(({ classes, ...props }: any) => (
  <TextField
    variant="outlined"
    InputProps={{
      classes: {
        input: classes.input,
        notchedOutline: classes.notchedOutline,
      },
      endAdornment: '%',
      inputProps: { inputMode: 'numeric', min: 0, max: 100 },
    }}
    FormHelperTextProps={{
      classes: {
        root: classes.helperText,
      },
    }}
    {...props}
  />
));
