import { withStyles, Button, makeStyles } from '@material-ui/core';

export const SideButton = withStyles((theme) => ({
  root: {
    minWidth: 170,
    height: 50,
    fontSize: 14,
    padding: [[6, 10]],
    borderRadius: 5,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    color: theme.palette.common.black75,
    [theme.breakpoints.down(1080)]: {
      width: 50,
      minWidth: 50,
      overflow: 'hidden',
    },
    '&:hover': {
      backgroundColor: '#EDF0F5',
    },
  },
  label: {
    paddingLeft: 5,
    whiteSpace: 'nowrap',
    justifyContent: 'flex-start',
    [theme.breakpoints.down(1080)]: {
      paddingLeft: 9,
    },
  },
  startIcon: {
    width: 17,
    marginRight: 10,
    [theme.breakpoints.down(1080)]: {
      marginRight: 20,
    },
  },
}))(Button);

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: 700,
    height: 'calc(100vh - 100px)',
    padding: [[20, 0]],
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.black7,
      borderRadius: 10,
    },
    '& > .MuiButtonBase-root': {
      position: 'fixed',
      zIndex: 3,
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 'calc(100vh - 40px)',
    },
  },
}));
