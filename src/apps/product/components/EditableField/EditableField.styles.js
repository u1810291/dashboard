import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const defaultFontSize = 18;

export const useStyles = makeStyles(() => ({
  flowName: {
    flexGrow: 3,
    fontSize: defaultFontSize,
  },
  editableField: {
    flexGrow: 3,
  },
  cssOutlinedInput: {
    paddingRight: 5,
    fontSize: defaultFontSize,
    '&$cssFocused $notchedOutline': {
      borderColor: '#8392B8 !important',
    },
    '&:hover $notchedOutline': {
      borderColor: '#8392B8',
    },
    '& input': {
      padding: [[13, 0, 13, 13]],
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: 1,
    borderColor: '#CBD2E2',
  },
}));

const buttonMaker = ({ icon }) => withStyles(() => (
  {
    root: {
      width: 25,
      height: 25,
      borderRadius: 4,
      border: [[1, 'solid', '#8392B8']],
      margin: 5,
      '&:hover': {
        backgroundColor: '#e6e9f3 !important',
      },
    },
    label: {
      width: 'auto',
      color: '#8392B8',
      '& svg': {
        strokeWidth: 1,
      },
    },
  }),
)(({ ...props }) => (
  <IconButton {...props} component="span">
    {icon}
  </IconButton>
));

export const SubmitButton = buttonMaker({ icon: <FiCheck /> });
export const CancelButton = buttonMaker({ icon: <FiX /> });
