import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      '& > *': {
        flexBasis: 'calc(33.33% - 20px)',
        marginRight: 20,
        '&:last-of-type': {
          marginRight: 0,
        },
      },
    },
  },
  itemWrapper: {
    marginBottom: 16,
    '&:last-of-type': {
      marginBottom: 0,
    },
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      marginBottom: 0,
      padding: 20,
      borderRadius: 5,
      border: `1px solid ${theme.palette.foreground.main}`,
    },
  },
  itemLocationWrapper: {
    ...(theme.isDarkMode && ({
      [theme.breakpoints.up('lg')]: {
        '& > *': {
          flexBasis: '100%',
          maxWidth: '100%',
        },
      },
    })),
  },
  title: {
    lineHeight: '1.1',
    color: theme.palette.text.main,
  },
  map: {
    marginBottom: 36,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
    [theme.isDarkMode ? theme.breakpoints.up('lg') : theme.breakpoints.up('xl')]: {
      marginBottom: 0,
      padding: 20,
    },
    '& > img': {
      borderRadius: 5,
      maxHeight: '100%',
    },
  },
  data: {
    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
    marginBottom: 6,
  },
}));
