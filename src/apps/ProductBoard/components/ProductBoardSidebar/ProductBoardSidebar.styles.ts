import { makeStyles } from '@material-ui/core/styles';
import { CLOSED_DRAWER_WIDTH, CLOSED_DRAWER_WIDTH_MOBILE, DRAWER_WIDTH } from '../../model/ProductBoard.model';

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'hidden',
  },
  drawerClosed: {
    width: CLOSED_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
  },
  drawerOpenMobile: {
    width: 'calc(100% - 60px)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'hidden',
  },
  drawerClosedMobile: {
    width: CLOSED_DRAWER_WIDTH_MOBILE,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
  },
  button: {
    width: 42,
    height: 42,
    marginTop: 16,
    marginLeft: 8,
  },
  closedButton: {
    width: 42,
    height: 42,
    zIndex: 9999,
  },
  listSubheading: {
    display: 'inline-block',
    marginLeft: 8,
  },
  drawerContent: {
    transform: 'translateX(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: 600,
    }),
    width: 275,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  drawerContentClosed: {
    transform: 'translateX(260px)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: 600,
    }),
    width: 275,
    [theme.breakpoints.down('xs')]: {
      width: 360,
    },
  },
}));
