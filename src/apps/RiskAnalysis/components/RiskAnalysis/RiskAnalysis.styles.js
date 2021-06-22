import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  bordered: {
    borderRadius: '4px',
    border: '1px solid rgba(237, 240, 245, .6)',
  },
}));
