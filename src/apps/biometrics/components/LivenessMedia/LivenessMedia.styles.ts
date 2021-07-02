import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  media: {
    display: 'block',
    maxWidth: '100%',
    width: '100%',
    height: 180,
    objectFit: 'cover',
    objectPosition: 'center',
  },
  mediaBox: {
    position: 'relative',
    backgroundColor: 'transparent',
    borderRadius: 5,
    overflow: 'hidden',
  },
  videoBox: {
    cursor: 'pointer',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: theme.palette.text.main,
    backgroundColor: 'transparent',
    paddingTop: 12,
  },
  play: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  sound: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    transform: 'translate(-50%, -50%)',
  },
  load: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: 25,
    height: 25,
    transform: 'translate(50%, -50%)',
    cursor: 'pointer',
  },
  title: {
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subtitle: {
    whiteSpace: 'nowrap',
    fontSize: 12,
  },
}));
