import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  buttonSave: {
    minWidth: 220,
    minHeight: 43,
    fontSize: 14,
    fontWeight: 'bold',
    '& svg': {
      marginRight: 5,
    },
    '&.Mui-disabled': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.lightblue,
      opacity: 0.5,
    },
  },
}));
