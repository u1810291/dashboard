import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  buttonOutlined: {
    minHeight: 50,
    fontSize: 14,
    color: theme.palette.common.black7,
    borderColor: theme.palette.common.black7,
    '& svg': {
      flexShrink: 0,
      marginRight: 5,
      fontSize: 17,
    },
    '&.Mui-disabled': {
      color: theme.palette.common.black7,
      borderColor: theme.palette.common.black7,
      opacity: 0.5,
    },
  },
  button: {
    minHeight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.black75,
    },
  },
  buttonVerified: {
    backgroundColor: theme.palette.common.green,
    '&:hover, &:focus': {
      backgroundColor: '#6BE9AE',
    },
  },
  buttonRejectedWrapper: {
    marginTop: 20,
    [theme.breakpoints.up('md')]: {
      margin: [[0, 0, 0, 20]],
    },
  },
  buttonRejected: {
    backgroundColor: theme.palette.common.red,
    '&:hover, &:focus': {
      backgroundColor: '#FF99A2',
    },
  },
  buttonLogWrapper: {
    marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 20,
      right: 40,
    },
    '@media (max-width: 600px)': {
      right: 20,
    },
  },
  buttonLog: {
    [theme.breakpoints.down('sm')]: {
      width: 50,
      minWidth: 50,
      overflow: 'hidden',
      '& span': {
        whiteSpace: 'nowrap',
        justifyContent: 'flex-start',
      },
      '& svg': {
        marginRight: 20,
      },

    },
  },
  number: {
    '& button, & h6': {
      color: theme.palette.common.black7,
    },
  },
  notification: {
    width: 430,
    position: 'absolute',
    top: 80,
    right: 26,
  },
}));
