import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    backgroundColor: theme.palette.common.gray,
    borderRadius: 10,
  },
  icon: {
    height: 17,
    '& svg': {
      width: 17,
      height: 17,
    },
  },
}));
