import { withStyles, Button } from '@material-ui/core';

export const ButtonStyled = withStyles((theme) => ({
  containedPrimary: {
    '&:disabled': {
      backgroundColor: theme.palette.common.blue,
      color: theme.palette.common.white,
      opacity: 0.3,
    },
  },
  outlinedSizeLarge: {
    paddingTop: '17px',
    paddingBottom: '16px',
    fontSize: '14px',
    lineHeight: '17px',
  },
  containedSizeLarge: {
    paddingTop: 17,
    paddingBottom: 16,
    fontSize: 14,
    lineHeight: '17px',
    border: '1px solid',
    borderColor: theme.palette.common.lightblue,
    '&:hover': {
      borderColor: 'rgb(56, 87, 165)',
    },
    '&:focused': {
      borderColor: 'transparent',
    },
    '&:disabled': {
      borderColor: 'transparent',
    },
  },
}))(Button as any);
