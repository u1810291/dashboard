import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  logo: {
    width: 135,
    height: 45,
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
