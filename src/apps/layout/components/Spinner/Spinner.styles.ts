import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  spinner: {
    backgroundColor: 'var(--mgi-theme-palette-default)',
    borderRadius: '100%',
    animation: 'sk-scaleout 1s infinite ease-in-out',
    animationDelay: '-0.5s',
    display: 'inline-block',
    margin: '0 auto',
    '& .spinner-small': {
      width: 15,
      height: 15,
    },
    '& .spinner-large': {
      width: 40,
      height: 40,
    },
  },
  '& @keyframes sk-scaleout': {
    '0%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0,
    },
  },
}));
