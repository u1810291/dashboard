import { makeStyles, Select, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  topMenuItem: {
    width: '100%',
    minHeight: 32,
    alignItems: 'center',
    lineHeight: 1,
    fontWeight: 'bold',
    transition: 'none',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    '&:focus': {
      background: 'rgba(255, 255, 255, 0.15)',
    },

  },
  menuIcon: {
    color: theme.palette.common.black7,
    position: 'absolute',
    left: 22,
    height: 17,
    width: 17,
  },
  menuList: {
    minWidth: '150px !important',
    maxWidth: 200,
  },
  select: {
    textTransform: 'capitalize',
    width: '100%',
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectItem: {
    position: 'relative',
    padding: '7px 10px 6px',
    color: theme.palette.common.black75,
    '&:hover': {
      backgroundColor: theme.palette.common.black7,
    },
  },
}));

export const SelectLight = withStyles((theme) => ({
  root: {
    paddingLeft: 60,
    color: theme.palette.secondary.main,
    '&:focus': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.common.black,
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.common.black,
    },
  },
}))(Select);
