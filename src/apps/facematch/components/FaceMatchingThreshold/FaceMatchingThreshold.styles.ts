import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  wrapper: {
    '& label': {
      alignItems: 'flex-start',
    },
  },
  field: {
    '& input': {
      padding: 12,
    },
  },
}));
