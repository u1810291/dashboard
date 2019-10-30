import { makeStyles, Select, withStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  select: {
    '&::before': {
      display: 'none',
    },
  },
});

export const SelectLight = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}))(Select);
