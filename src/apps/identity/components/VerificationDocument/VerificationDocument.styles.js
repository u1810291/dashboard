import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 10,
  },
  imageWrapper: {
    maxHeight: 160,
  },
  imageWrapperHorizontal: {
    '@media (min-width: 1440px)': {
      flexDirection: 'row',
    },
  },
  image: {
    lineHeight: 0,
    '& img': {
      maxHeight: '100%',
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  imageActive: {
    border: `2px solid ${theme.palette.common.lightblue}`,
  },
  imageEmpty: {
    borderRadius: 5,
  },
  imageBigVertical: {
    width: 96,
    height: 160,
    marginRight: 20,
    lineHeight: 0,
    textAlign: 'center',
    '@media (min-width: 375px)': {
      width: 114,
    },
    [theme.breakpoints.up('sm')]: {
      width: 120,
    },
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: 5,
    },
  },
  imageBigHorizontal: {
    height: 100,
    lineHeight: 0,
    textAlign: 'center',
    '& img': {
      height: 100,
      objectFit: 'cover',
      borderRadius: 5,
    },
    '@media (min-width: 1440px)': {
      maxWidth: 'calc(100% - 100px)',
      width: 200,
      height: 120,
      '& img': {
        height: 120,
      },
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 'calc(100% - 140px)',
      width: 240,
      height: 160,
      '& img': {
        height: 160,
      },
    },
  },
  imageSmallVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 40,
    maxHeight: 160,
    lineHeight: 0,
    '& img': {
      maxHeight: 75,
      marginBottom: 10,
      objectFit: 'cover',
      borderRadius: 5,
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
    [theme.breakpoints.up('xl')]: {
      width: 60,
    },
  },
  imageSmallHorizontal: {
    height: 40,
    marginTop: 20,
    lineHeight: 0,
    '& img': {
      maxWidth: 'calc(50% - 5px)',
      height: 40,
      marginRight: 10,
      objectFit: 'cover',
      borderRadius: 5,
      '&:last-of-type': {
        marginRight: 0,
      },
    },
    '@media (min-width: 1440px)': {
      height: 'auto',
      width: 80,
      marginTop: 0,
      margin: [[0, 0, 0, 20]],
      '& img': {
        maxWidth: '100%',
        height: 50,
        margin: [[0, 0, 20]],
        '&:last-of-type': {
          marginBottom: 0,
        },
      },
    },
    [theme.breakpoints.up('xl')]: {
      width: 120,
      '& img': {
        height: 70,
        width: '100%',
      },
    },
  },
  emptyCaption: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.palette.text.main,
  },
}));
