import { makeStyles } from '@material-ui/styles';
import BlueImage from 'assets/questions-bkg.jpg';

export const useStyles = makeStyles((theme) => ({
  blurredBG: {
    background: `url(${BlueImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  overlay: {
    backgroundColor: theme.palette.background.default,
    width: '80%',
    height: '35rem',
    padding: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  },
  left: {
    backgroundColor: theme.palette.primary.main,
    width: '20rem',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
}));
