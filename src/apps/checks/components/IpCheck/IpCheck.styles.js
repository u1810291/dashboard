import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
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
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      padding: 20,
      borderRadius: 5,
      border: `1px solid ${theme.palette.foreground.main}`,
    },
  },
  title: {
    lineHeight: '1.1',
    color: theme.palette.text.main,
  },
  map: {
    marginBottom: 36,
    borderRadius: 5,
    backgroundColor: theme.palette.foreground.main,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      padding: 20,
    },
    '&>img': {
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
  checking: {
    position: 'relative',
    margin: [[0, 'auto', 20]],
    padding: [[30, 20, 0]],
    textAlign: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 22,
      height: 22,
      transform: 'translateX(-50%)',
    },
    [theme.breakpoints.up('md')]: {
      margin: [[0, 0, 20]],
      padding: [[0, 36]],
      textAlign: 'left',
      '&:after': {
        left: 0,
        transform: 'none',
      },
    },
  },
}));
