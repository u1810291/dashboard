import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.loader,
  },
  logo: {
    opacity: 1,
    animation: '$logoInOut 2s infinite',
  },
  '@keyframes logoInOut': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
  },
  '@-webkit-keyframes logoInOut': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
  },
}));
