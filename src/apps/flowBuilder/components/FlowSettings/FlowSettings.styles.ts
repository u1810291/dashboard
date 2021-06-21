import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    border: `1px solid ${theme.palette.common.black7}`,
    borderRadius: 5,
  },
  buttonsWrapper: {
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'space-between',
      marginTop: 60,
    },
  },
  button: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  buttonDelete: {
    borderColor: theme.palette.common.red,
    color: theme.palette.common.red,
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
  buttonSave: {
    backgroundColor: theme.palette.common.lightblue,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
  },
}));
