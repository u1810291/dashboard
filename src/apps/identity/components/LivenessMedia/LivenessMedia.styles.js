import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
  },
  media: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: 'auto',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  mediaBox: {
    position: 'relative',
    backgroundColor: '#ccc',
  },
  videoBox: {
    cursor: 'pointer',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black90,
    height: 50,
  },
  play: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
