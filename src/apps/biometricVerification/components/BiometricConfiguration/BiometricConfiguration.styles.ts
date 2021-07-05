import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    '& label': {
      alignItems: 'flex-start',
    },
  },
  media: {
    flexShrink: 0,
    width: 80,
    height: 80,
    borderRadius: '50%',
    overflow: 'hidden',
    '& video': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}));
