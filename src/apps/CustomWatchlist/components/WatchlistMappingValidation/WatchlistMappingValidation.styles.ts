import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  error: {
    color: theme.palette.common.red,
  },
}));
