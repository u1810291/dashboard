import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  wrapper: {
    '& > div': {
      margin: 0,
      '& > div:first-child': {
        marginBottom: 10,
      },
    },
    '& button': {
      margin: '10px 10px 0 0',
    },
  },
}));
