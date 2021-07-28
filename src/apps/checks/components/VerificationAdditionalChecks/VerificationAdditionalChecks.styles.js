import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.main,
  },
  bordered: {
    borderColor: theme.palette.foreground.main,
  },
}));
