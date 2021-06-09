import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    '@media print': {
      display: 'none',
    },
  },
  buttonBack: {
    minWidth: 200,
    [theme.breakpoints.down(1120)]: {
      minWidth: 50,
    },
  },
  itemOffsetRight: {
    marginLeft: 'auto',
  },
  itemOffsetLeft: {
    marginLeft: 10,
  },
  deleteButton: {
    color: theme.palette.common.red,
  },
}));
