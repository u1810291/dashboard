import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: 20,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 0,
      paddingRight: 20,
    },
    '&:last-of-type': {
      marginBottom: 0,
      paddingRight: 0,
    },
  },
  itemWrapper: {
    [theme.breakpoints.up('xl')]: {
      height: '100%',
      padding: [[20, 15]],
      borderRadius: 5,
      border: `1px solid ${theme.palette.foreground.main}`,
    },
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.main,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: theme.palette.text.main,
  },
  images: {
    height: '100%',
    padding: 20,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
    },
  },
  image: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('xl')]: {
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
  imagesVertical: {
    '& > *': {
      maxWidth: 'calc(50% - 10px)',
      margin: [[0, 20, 0, 0]],
      '&:last-of-type': {
        margin: 0,
      },
    },
    [theme.breakpoints.up('lg')]: {
      '& > *': {
        maxWidth: '100%',
        minWidth: '50%',
        margin: [[0, 0, 20]],
        '&:last-of-type': {
          margin: 0,
        },
        '& > div': {
          maxHeight: 500,
          minHeight: 300,
        },
        '& img': {
          maxHeight: 500,
          minHeight: 300,
        },
      },
    },
    [theme.breakpoints.up('xl')]: {
      '& > *': {
        maxWidth: 'calc(50% - 10px)',
        minWidth: 'auto',
        margin: [[0, 20, 0, 0]],
        '&:last-of-type': {
          margin: 0,
        },
      },
    },
  },
  imagesHorizontal: {
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginBottom: 20,
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  },
  skeletonHorizontal: {
    minWidth: 200,
  },
  skeletonVertical: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 80,
    '& > div': {
      height: '100%',
    },
  },
}));
