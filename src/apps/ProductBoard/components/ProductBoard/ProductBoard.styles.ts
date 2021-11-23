import { makeStyles } from '@material-ui/core/styles';
import { CLOSED_DRAWER_WIDTH, DRAWER_WIDTH } from '../../model/ProductBoard.model';

export const useStyles = makeStyles(() => ({
  iframeOpen: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
  iframeClosed: {
    width: `calc(100% - ${CLOSED_DRAWER_WIDTH}px)`,
  },
  iframeOpenMobile: {
    width: '100%',
  },
}));
