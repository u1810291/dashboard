import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: [[1, 'solid', theme.palette.warning.main]],
    borderRadius: 5,
  },
  icon: {
    color: theme.palette.warning.main,
    flexGrow: 0,
    margin: [[5, 20, 5, 5]],
  },
  content: {
    flexGrow: 1,
  },
}));
