import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { makeStyles, withStyles, ButtonProps } from '@material-ui/core';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';

export const useStyles = makeStyles((theme) => ({
  colorGrey: {
    color: theme.palette.text.main,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  uploadButton: {
    marginTop: 20,
    height: 40,
  },
  uploadButtonHelper: {
    color: theme.palette.text.main,
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
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
