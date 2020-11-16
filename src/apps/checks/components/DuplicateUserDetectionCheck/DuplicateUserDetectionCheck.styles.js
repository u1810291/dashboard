import { makeStyles } from '@material-ui/core';
import IconLoad from 'assets/icon-load.svg';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  value: {
    fontWeight: 'bold',
    color: theme.palette.common.black90,
  },
  title: {
    lineHeight: '1.1',
    color: theme.palette.common.black75,
  },
  map: {
    marginBottom: 36,
    borderRadius: 5,
    backgroundColor: theme.palette.common.black7opacity,
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
    color: theme.palette.common.black90,
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
  checkingResult: {
    '&:after': {
      background: `url(${IconLoad}) no-repeat center center`,
    },
  },
  checkingTitle: {
    color: theme.palette.common.black75,
  },
  checkingText: {
    color: theme.palette.common.black75,
    lineHeight: 1.1,
  },
}));
