import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  block: {
    height: 150,
  },
  request: {
    position: 'relative',
    '&::after': {
      content: ' ',
      opacity: '0.1',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundImage: 'url("phone.png")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: [[27, 20]],
    },
  },
  button: {
    zIndex: 123,
    '&:focus': {
      outline: 'none',
    },
  },
}));
