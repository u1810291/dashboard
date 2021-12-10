import { makeStyles } from '@material-ui/core/styles';
import { CLOSED_DRAWER_WIDTH, DRAWER_WIDTH } from '../../model/ProductBoard.model';

export const useStyles = makeStyles((theme) => ({
  iframeOpen: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  iframeClosed: {
    width: `calc(100% - ${CLOSED_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  iframeOpenMobile: {
    width: '100%',
    height: 'calc(100% - 30px)',
  },
  loaderContainer: {
    position: 'absolute',
    height: '100vh',
    backgroundColor: theme.palette.common.palegray,
  },
  loaderContainerHidden: {
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
    pointerEvents: 'none',
  },
}));
