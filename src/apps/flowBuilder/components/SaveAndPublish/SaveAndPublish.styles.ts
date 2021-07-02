import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  badge: {
    position: 'relative',
    minWidth: 200,
    minHeight: 43,
    marginRight: 14,
    padding: 16,
    borderRadius: 10,
    fontWeight: 'bold',
    color: theme.palette.common.yellow,
    backgroundColor: theme.palette.common.white,
    '&::after': {
      content: '""',
      position: 'absolute',
      right: -12,
      top: '50%',
      border: '6px solid transparent',
      borderLeft: `6px solid ${theme.palette.common.white}`,
      transform: 'translateY(-50%)',
    },
  },
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
