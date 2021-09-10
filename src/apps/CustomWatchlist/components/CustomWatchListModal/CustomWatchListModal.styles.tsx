import React from 'react';
import { createStyles } from '@material-ui/styles';
import { FiUpload } from 'react-icons/fi';
import { makeStyles, withStyles, Button, ButtonProps } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    background: '#fff',
    padding: '21px 40px',
    width: 700,
  },
  modalTitle: {
    lineHeight: '29px',
    marginBottom: 40,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  colorGrey: {
    color: theme.palette.text.main,
  },
  placeholder: {
    color: theme.palette.text.disabled,
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '20px',
    height: '20px',
    // @ts-ignore
    color: theme.palette.button.close.main,
  },
  fileName: {
    border: `1px solid ${theme.palette.common.black7}`,
    padding: '10px',
    borderRadius: '5px',
  },
  fileNameTitle: {
    color: theme.palette.text.main,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
}));

export const RoundedButton = withStyles((theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: theme.palette.common.whiteblue,
    color: theme.palette.common.lightblue,
    fontSize: 14,

    '&:hover': {
      backgroundColor: theme.palette.common.lightbluehover,
      color: theme.palette.common.whiteblue,
    },
  },
}))(({ classes, children }: ButtonProps) => (
  <Button
    component="span"
    size="small"
    color="inherit"
    variant="contained"
    startIcon={<FiUpload />}
    classes={classes}
  >
    {children}
  </Button>
));
