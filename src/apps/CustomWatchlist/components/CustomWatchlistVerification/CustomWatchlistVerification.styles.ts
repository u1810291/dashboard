import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  bordered: {
    borderColor: 'rgba(237, 240, 245, .6)',
  },
  labelError: {
    color: theme.palette.common.red,
  },
}));
