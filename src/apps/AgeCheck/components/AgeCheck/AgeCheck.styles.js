import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    border: 'none',
    filter: 'none',
    boxShadow: 'none',
  },
  bordered: {
    borderColor: 'rgba(237, 240, 245, .6)',
  },
}));
