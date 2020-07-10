import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  logoItem: {
    flexGrow: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logoImg: {
    width: 60,
    height: 20,
    minWidth: 60,
    'background-repeat': 'no-repeat',
  },
  desktopLeft: {
    display: 'flex',
    flexGrow: 1,
  },
  desktopRight: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  mobileMenu: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: 250,
    maxWidth: '100%',
    padding: [[10, 0]],
  },
  mobileLeft: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  mobileRight: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
  },
}));
