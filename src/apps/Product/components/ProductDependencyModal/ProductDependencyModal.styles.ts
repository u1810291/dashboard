import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  modal: {
    [theme.breakpoints.up('lg')]: {
      width: 725,
      padding: '20px 40px 40px',
    },
  },
  wrapper: {
    flexGrow: 1,
    color: theme.palette.common.black75,
    '& > div': {
      height: '100%',
      marginBottom: 10,
      '&:last-child': {
        marginBottom: 0,
      },
      '& > div': {
        height: '100%',
        '&.Mui-expanded:last-child': {
          marginBottom: 0,
        },
      },
    },
  },
  buttonsWrapper: {
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    },
  },
  button: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 250,
      '&:last-of-type': {
        marginLeft: 20,
      },
    },
  },
  buttonCancel: {
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
  },
  buttonCancelRed: {
    color: theme.palette.common.red,
    borderColor: theme.palette.common.red,
  },
  buttonSave: {
    backgroundColor: theme.palette.common.lightblue,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
  },
  buttonSaveRed: {
    backgroundColor: theme.palette.common.red,
    '&:hover': {
      backgroundColor: theme.palette.common.redopacity,
    },
  },
}));
