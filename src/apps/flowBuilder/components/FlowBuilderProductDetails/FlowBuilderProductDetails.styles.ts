import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
  },
}));
