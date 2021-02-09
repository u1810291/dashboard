import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  image: {
    textAlign: 'center',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      '& > div': {
        maxHeight: 320,
      },
      '& img': {
        maxHeight: 320,
      },
    },
    '& img': {
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: theme.palette.common.black75,
  },
}));
