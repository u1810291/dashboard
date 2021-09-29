import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  loader: {
    backgroundColor: '#efefef',
    borderRadius: 5,
    background: `linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
    `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '60px 500px',
    backgroundPosition: '-100px 0',
    animation: '$shine 2s infinite',
  },
  container: {
    position: 'relative',
    minHeight: 40,
  },
  imageIcon: {
    color: '#c5c5c5',
    fontSize: '1.3em',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
