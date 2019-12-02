import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  icon: {
    display: 'inline-block',
    marginLeft: '1rem',
    width: 18,
    height: 'auto',
    '&+&': {
      marginLeft: '0.5rem',
    },
  },
}));
