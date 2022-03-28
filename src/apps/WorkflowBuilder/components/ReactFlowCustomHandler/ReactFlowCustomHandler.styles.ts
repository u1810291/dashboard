import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => createStyles({
  handle: {
    borderRadius: 0,
    width: 0,
    height: 0,
  },
}));
