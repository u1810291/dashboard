import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  senderName: {
    marginTop: 10,
    width: '100%',
  },
  riskAnalysis: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  select: {
    minHeight: 50,
    borderRadius: 4,
    border: '1px solid rgb(131, 146, 184)',
    width: '100%',
    padding: '0 22px 0 10px',
    marginTop: 10,
    color: theme.palette.common.black75,
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.common.lightblue,
    },
    input: {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-input': {
      display: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black75,
    },
    '& .MuiSelect-icon': {
      marginTop: 3,
      fontSize: 17,
      right: 12,
      color: theme.palette.common.black75,
    },
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
