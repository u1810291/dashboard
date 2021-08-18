import { TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export const useStyles = makeStyles(() => ({
  title: {
    marginBottom: '40px',
  },
  uploadBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px',
    height: '300px',
    border: '1px dashed #CBD2E2',
    boxSizing: 'border-box',
    borderRadius: '5px',
    marginBottom: '41px',
  },
  fileInput: {
    width: '200px',
    height: '50px',
    border: '1px solid #507DED',
    borderRadius: '6px',
  },
  uploadIcon: {
    marginRight: '10px',
    height: '17px',
    width: '17px',
    verticalAlign: 'middle',
  },
  dropzoneHolder: {
    padding: '16px 30px',
    borderRadius: '6px',
    border: '1px solid #507DED',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageButton: {
    display: 'inline-block',
    padding: '2px',
    minWidth: '30px ',
    minHeight: '14px !important',
    border: '1px solid #507DED',
    color: '#507DED',
    marginRight: '10px',
    verticalAlign: 'text-top',
    marginBottom: '21px',
    '&> span': {
      display: 'flex !important',
    },
  },
  pageButtonsHolder: {
    display: 'flex',
  },
  button: {
    width: '100%',
  },
  deleteButton: {
    display: 'flex !important',
    color: '#FE7581',
    verticalAlign: 'center',
    justifyContent: 'center !important',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activePageButton: {
    backgroundColor: '#EBEEFF',
  },
  logoPreview: {
    maxWidth: 230,
    maxHeight: 190,
    backgroundSize: 'cover',
    width: 'auto',
    height: 'auto',
  },
  pageDeleteButton: {
    display: 'flex !important',
    color: '#FE7581',
    verticalAlign: 'center',
    justifyContent: 'center !important',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
  },
  chevronLeft: {
    marginRight: '7px',
  },
  input: {
    height: '50px',
    width: '100%',
    marginBottom: '16.5px',
  },
  radioForm: {
    '& span.MuiIconButton-label': {
      color: '#8392B8',
    },
    '& span.MuiTypography-body1': {
      color: '#8392B8',
    },
    '& label.MuiFormControlLabel-root': {
      height: '17px',
      marginTop: '7.5px',
      marginBottom: '7.5px',
    },
  },
}));

export const TextFieldInput = withStyles({
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
