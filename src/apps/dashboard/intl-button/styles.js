import { makeStyles } from '@material-ui/core/styles';
import { default as arrowGenerator } from './arrowGenerator';

export default makeStyles(theme => ({
  intlButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  avatar: {
    height: 'auto',
    backgroundColor: 'transparent',
  },
  listItem: {
    paddingLeft: theme.spacing(1),
  },
  itemAvatar: {
    minWidth: 'auto'
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: {
    ...arrowGenerator('white'),
    'z-index': 10000
  }
}));
