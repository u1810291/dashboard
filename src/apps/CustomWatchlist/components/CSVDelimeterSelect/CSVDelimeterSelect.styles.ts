import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  title: {
    color: theme.palette.common.black75,
  },
  selectWrap: {
    marginTop: 20,
    width: 60,
  },
  select: {
    '.MuiSelect-root': {
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.palette.common.black75,
      '&:after': {
        display: 'none',
      },
    },
  },
}));
