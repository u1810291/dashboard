import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'static',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 64,
    display: 'flex',
    marginTop: 'auto',
    padding: [[20, 0]],
    backgroundColor: 'transparent',
  },
  container: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    padding: [[0, 10, 0, 20]],
    [theme.breakpoints.up('sm')]: {
      padding: [[0, 30, 0, 40]],
    },
  },
  company: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  img: {
    height: '100%',
    maxHeight: 17,
    width: 'auto',
    flexGrow: 0,
  },
  message: {
    flexGrow: 1,
    fontWeight: 'normal',
    paddingLeft: 20,
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  },
  links: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  emailLink: {
    color: '#232939',
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginRight: 20,
  },
  supportButton: {
    color: theme.palette.common.lightblue,
    fontWeight: 700,
    borderColor: theme.palette.common.lightblue,
    padding: [[5, 11]],
    marginRight: 10,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
  },
  socialLink: {
    flexShrink: 0,
    display: 'block',
    padding: [[10, 10, 5]],
    marginLeft: 5,
    [theme.breakpoints.down('375')]: {
      padding: [[10, 5, 5]],
    },
  },
}));
