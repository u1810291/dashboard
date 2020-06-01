import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  checkSection: {
    '& h2': {
      lineHeight: 3,
    },
  },
  video: {
    width: 230,
    maxHeight: 306,
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: 4,
  },
  borderRadius: {
    borderRadius: 4,
  },
}));
