import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: '40px',
  },
  subtitle: {
    marginBottom: '6px',
  },
  helpText: {
    color: '#8392B8',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
  },
  contentHolder: {
    marginBottom: '38px',
  },
  continue: {
    width: '100%',
  },
  back: {
    width: '100%',
  },
  select: {
    minHeight: 50,
    borderRadius: '4px',
    border: '1px solid rgb(131, 146, 184)',
    width: '100%',
    padding: '0 22px 0 10px',
    color: theme.palette.common.black75,
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#507DED',
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
      right: '12px',
      color: theme.palette.common.black75,
    },
  },
  chevronLeft: {
    marginRight: '7px',
  },
  buttonsHolder: {
    display: 'flex',
  },
  editButton: {
    display: 'flex !important',
    padding: '2px',
    minWidth: '14px',
    minHeight: '14px !important',
    color: '#507DED',
    marginRight: '10px',
    verticalAlign: 'text-top',
  },
  deleteButton: {
    display: 'flex !important',
    padding: '2px',
    minWidth: '14px',
    minHeight: '14px !important',
    color: '#FE7581',
    verticalAlign: 'text-top',
  },
  optionsHolder: {
    marginBottom: '20px',
  },
  tag: {
    width: '98%',
    backgroundColor: '#EDF2FD',
    borderRadius: '5px',
    color: '#507DED',
    display: 'flex',
    verticalAlign: 'top',
    marginBottom: '5px',
    padding: '7px 10px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  secondCaption: {
    marginBottom: '6px',
  },
  addIcon: {
    marginRight: '3px',
    display: 'inline-block',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid #507DED',
    width: '54px',
    height: '27px',
    fontSize: '14p',
    color: '#507DED',
    minHeight: '0 !important',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato',
    lineHeight: '17px',
    borderColor: '#8392B8',
    borderRadius: '5px',
    resize: 'none',
    '&::placeholder': {
      color: '#CBD2E2',
    },
  },
}));

export const TextFieldInput = withStyles({
  input: {
    width: '100%',
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
        textarea: classes.textarea,
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
