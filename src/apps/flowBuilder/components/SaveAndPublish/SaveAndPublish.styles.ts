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
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    '&:disabled': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.lightblue,
      opacity: 0.5,
    },
  },
  issues: {
    color: theme.palette.common.red,
    position: 'absolute !important' as any,
    right: 355,
    top: -3,
  },
  unsavedChanges: {
    position: 'absolute !important' as any,
    right: 355,
    top: -3,
  },
}));
