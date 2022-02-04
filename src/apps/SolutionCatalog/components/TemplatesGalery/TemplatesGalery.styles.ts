import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  swiper: {
    width: '100%',
    height: '100%',
    paddingBottom: '8px',
    display: 'flex',
  },
  swiperSlide: {
    borderRadius: '5px',
    backgroundColor: theme.palette.common.white,
    filter: `border: 1,5px solid ${theme.palette.common.blueopacity}`,
    minWidth: '220px',
    minHeight: '156px',
    maxWidth: '220px',
    maxHeight: '156px',
  },
  controlsContainer: {
    position: 'absolute',
    width: '100%',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  navigationControl: {
    borderRadius: '60px',
    backgroundColor: theme.palette.common.lightblue,
    zIndex: 1,
    width: '51px',
    height: '51px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationControlHidden: {
    opacity: 0,
  },
}));
