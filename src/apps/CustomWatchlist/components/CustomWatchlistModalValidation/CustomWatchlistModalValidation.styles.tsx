import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { makeStyles, withStyles, ButtonProps } from '@material-ui/core';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.white,
    padding: '21px 40px',
    width: 700,
  },
  modalTitle: {
    lineHeight: '29px',
    marginBottom: 40,
  },
  colorGrey: {
    color: theme.palette.text.main,
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '20px',
    height: '20px',
    color: theme.palette.button.close.main,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  buttonRunning: {
    marginRight: 10,
    display: 'inline-block',
  },
  marginBottom50: {
    marginBottom: 50,
  },
  error: {
    color: theme.palette.common.red,
  },
  buttonContainer: {
    position: 'relative',
  },
  validationHelper: {
    position: 'absolute',
    top: -10,
    right: 10,
    color: theme.palette.common.black75,
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
  <ButtonStyled
    component="span"
    size="small"
    color="inherit"
    variant="contained"
    startIcon={<FiUpload />}
    classes={classes}
  >
    {children}
  </ButtonStyled>
));