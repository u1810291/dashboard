import { makeStyles, Select, withStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  select: {
    '&::before': {
      display: 'none',
    },
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
});

export const SelectLight = withStyles((theme) => ({
  root: {
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
