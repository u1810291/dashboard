import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    '@media (min-width: 1440px) and (max-width: 1919px)': {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    ...(theme.isDarkMode && ({
      '@media (min-width: 1280px) and (max-width: 1919px)': {
        flexBasis: '50%',
        maxWidth: '50%',
      },
    })),
  },
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    color: theme.palette.text.main,
  },
  card: {
    width: '100%',
    border: 'none',
    filter: 'none',
    boxShadow: 'none',
  },
  image: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 30,
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      '& > div': {
        maxHeight: 320,
      },
      '& img': {
        maxHeight: 320,
      },
    },
    '& img': {
      margin: [[0, 'auto']],
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: theme.palette.text.main,
  },
}));
