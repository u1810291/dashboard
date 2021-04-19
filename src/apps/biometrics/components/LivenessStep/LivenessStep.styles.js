import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      '& > div:first-of-type': {
        flexBasis: 'calc(33.33% - 20px)',
        marginRight: 20,
      },
    },
  },
  wrapperBg: {
    [theme.breakpoints.up('md')]: {
      '& > div:first-of-type': {
        flexBasis: 'calc(66.666667% - 20px)',
        marginRight: 20,
      },
    },
  },
  itemWrapper: {
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      padding: [[20, 15]],
      borderRadius: 5,
      border: `1px solid ${theme.palette.foreground.main}`,
    },
  },
  info: {
    padding: [[10, 5]],
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      padding: [[10, 20]],
    },
  },
  large: {
    '& > div:nth-child(2)': {
      [theme.breakpoints.up('lg')]: {
        margin: [[0, 25]],
      },
    },
  },
  title: {
    fontSize: 14,
    lineHeight: '1.1',
    color: theme.palette.text.main,
  },
  mediaItem: {
    padding: [[10, 5]],
    maxWidth: 135,
    minWidth: 110,
    [theme.breakpoints.down(576)]: {
      maxWidth: 120,
      minWidth: 110,
    },
  },
}));
