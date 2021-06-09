import { Button, withStyles } from '@material-ui/core';

export const ButtonHeaderMenu = withStyles((theme) => ({
  root: {
    minWidth: 170,
    height: 50,
    fontSize: 14,
    padding: [[6, 10]],
    borderRadius: 5,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    color: theme.palette.text.main,
    [theme.breakpoints.down(1120)]: {
      width: 50,
      minWidth: 50,
      overflow: 'hidden',
    },
    '&:hover': {
      backgroundColor: theme.palette.common.black7,
    },
  },
  label: {
    paddingLeft: 5,
    whiteSpace: 'nowrap',
    justifyContent: 'flex-start',
    [theme.breakpoints.down(1120)]: {
      paddingLeft: 11,
    },
  },
  startIcon: {
    width: 17,
    marginRight: 10,
    [theme.breakpoints.down(1120)]: {
      marginRight: 20,
    },
  },
}))(Button);
