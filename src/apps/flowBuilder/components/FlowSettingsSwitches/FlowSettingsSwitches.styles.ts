import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  inputLabel: {
    lineHeight: 1.2,
    whiteSpace: 'pre-wrap',
  },
  input: {
    width: '82px',
    '& input': {
      padding: 10,
    },
  },
}));
