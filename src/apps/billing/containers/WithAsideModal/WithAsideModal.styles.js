import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  withAsideModal: {
    borderRadius: [[4, 0, 0, 4]],
    height: 540,
    width: 290,
    maxWidth: 290,
  },
  image: {
    width: 64,
  },
  dooplaText: {
    padding: [[0, 26, 0, 0]],
    lineHeight: 14,
    opacity: 0.7,
  },
  title: {
    lineHeight: 40,
    height: 330,
    display: 'flex',
    alignItems: 'center',
  },
  phrase: {
    height: 75,
    position: 'relative',
  },
  verificationTop: {
    position: 'absolute',
    marginLeft: -2,
    marginTop: -25,
  },
  verificationBottom: {
    position: 'absolute',
    marginLeft: 185,
    marginTop: 50,
  },
  doopla: {
    paddingTop: 20,
    '& span': {
      lineHeight: 0,
    },
  },
  withAsideModalContent: {
    height: 540,
    width: 370,
    maxWidth: 370,
    borderRadius: [[0, 4, 4, 0]],
  },
}));
