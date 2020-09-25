import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  initImage: {
    maxHeight: 220,
    position: 'relative',
    display: 'block',
    outline: 'none',
    '& .hoverWrapper': {
      position: 'absolute',
      zIndex: 92,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '& .zoomIcon': {
        display: 'none',
      },
    },
    '&:hover': {
      '& .hoverWrapper': {
        background: 'rgba(27, 26, 26, 0.6)',
        transition: [['all', '0.2s', 'ease-in-out']],
        '& .zoomIcon': {
          display: 'block',
        },
      },
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
    '& .zoomedImage': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      transition: [['all', '0.2s', 'ease-out']],
      userSelect: 'none',
      margin: [[0, 'auto']],
      outline: 'none',
    },
    '& .actions': {
      '& .left, & .right': {
        position: 'absolute',
        cursor: 'pointer',
        top: -80,
      },
      '& .left': {
        right: 0,
      },
      '& .right': {
        right: -40,
      },
    },
  },
}));
