import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '100%',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    paddingBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  header: {
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    transition: '.2s all ease-in-out',
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      zIndex: 1,
      top: 0,
    },
  },
  headerScrolled: {
    [theme.breakpoints.up('md')]: {
      boxShadow: '-2px 1px 30px #181C26',
    },
  },
}));
