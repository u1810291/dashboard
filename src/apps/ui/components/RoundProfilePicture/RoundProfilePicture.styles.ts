import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}));
