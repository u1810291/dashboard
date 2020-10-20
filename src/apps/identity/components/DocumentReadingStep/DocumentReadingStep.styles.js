import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  editInputWrapper: {
    '& .MuiOutlinedInput-root input': {
      padding: [[4, 10]],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.lightblue,
    },
  },
  inputsWrapper: {
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  inputWrapper: {
    width: 'calc(50% - 20px)',
    marginBottom: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  editableInput: {
    marginBottom: 6,
    color: theme.palette.common.black90,
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  editLabel: {
    padding: [[4, 10, 0]],
    fontWeight: 'normal',
    color: theme.palette.common.black75,
  },
  label: {
    color: theme.palette.common.black75,
  },
  buttonWrapper: {
    backgroundColor: theme.palette.common.whiteblue,
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% + 40px)',
      margin: [['auto', 0, 0, -20]],
    },
  },
  button: {
    fontSize: 14,
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
    '& img': {
      marginRight: 10,
    },
  },
  buttonHalf: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
  },
}));
