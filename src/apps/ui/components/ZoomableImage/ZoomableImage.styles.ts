import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  initImage: {
    maxHeight: 220,
    minHeight: '120px !important',
    position: 'relative',
    display: 'block',
    outline: 'none',
    '&:hover': {
      '& .hoverWrapper': {
        background: 'rgba(27, 26, 26, 0.6)',
        transition: 'all 0.2s ease-in-out',
        '& .zoomIcon': {
          display: 'block',
        },
      },
    },
  },
  hoverWrapper: {
    position: 'absolute',
    zIndex: 92,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    '& .zoomIcon': {
      display: 'none',
    },
  },
  zoomContent: {
    display: 'flex',
    position: 'relative',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 0,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  zoomedImage: {
    objectFit: 'contain',
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    transition: 'all 0.2s ease-out',
    userSelect: 'none',
    margin: '0 auto',
    outline: 'none',
  },
  actions: {
    position: 'absolute',
    display: 'flex',
    cursor: 'pointer',
    top: -80,
    right: 0,
  },
  actionIcon: {
    marginRight: 5,
  },
}));
