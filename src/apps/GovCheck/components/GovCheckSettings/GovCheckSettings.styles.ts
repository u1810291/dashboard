import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  setting: {
    '& > div > div': {
      marginRight: 0,
    },
  },
}));
