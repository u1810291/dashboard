import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  bordered: {
    borderColor: theme.palette.common.black7opacity,
  },
  labelError: {
    color: theme.palette.common.red,
  },
  title: {
    color: theme.palette.common.black,
    marginBottom: 20,
  },
}));
