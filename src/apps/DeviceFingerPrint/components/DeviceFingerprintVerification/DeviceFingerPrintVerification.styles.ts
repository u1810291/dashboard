import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  wrapper: {
    '@media (min-width: 1440px) and (max-width: 1919px)': {
      flexBasis: '50%',
      maxWidth: '50%',
    },
  },
}));
