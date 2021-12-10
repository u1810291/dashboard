import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  spinner: {
    animation: '$spin 1.5s linear 0s infinite',
    '& .spinner-small': {
      width: 15,
      height: 15,
    },
    '& .spinner-medium': {
      width: 30,
      height: 30,
    },
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg);',
    },
    to: {
      transform: 'rotate(360deg);',
    },
  },
}));
