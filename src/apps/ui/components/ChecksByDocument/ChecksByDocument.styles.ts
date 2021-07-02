import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.foreground.main}`,
  },
  wrapper: {
    '& > div:last-child': {
      marginBottom: 0,
    },
  },
  image: {
    borderRadius: 5,
    overflow: 'hidden',
    '& img': {
      height: 75,
      width: '100%',
      objectFit: 'cover',
    },
  },
}));
