import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('lg')]: {
      '& > *': {
        flexBasis: 'calc(33.33% - 20px)',
        marginRight: 20,
        '&:last-of-type': {
          marginRight: 0,
        },
      },
    },
  },
  imagesWrapper: {
    marginBottom: 20,
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
    },
  },
  itemWrapper: {
    marginBottom: 20,
    '&:last-of-type': {
      marginBottom: 0,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
      padding: [[20, 15]],
      borderRadius: 5,
      border: '1px solid rgba(237, 240, 245, .6)',
    },
  },
  itemBox: {
    height: '100%',
    '& > .MuiBox-root': {
      height: '100%',
    },
  },
  title: {
    fontSize: 14,
    color: theme.palette.common.black75,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: theme.palette.common.black75,
  },
  images: {
    height: '100%',
    padding: 20,
    borderRadius: 5,
    backgroundColor: theme.palette.common.black7opacity,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  image: {
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
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
