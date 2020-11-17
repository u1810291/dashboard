import { Button, makeStyles, withStyles } from '@material-ui/core';
import IconLoad from 'assets/icon-load.svg';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
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
  data: {
    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.common.black90,
    marginBottom: 6,
  },
  checking: {
    position: 'relative',
    margin: [[0, 'auto', 20]],
    padding: [[30, 30, 0]],
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
  bordered: {
    borderColor: 'rgba(237, 240, 245, .6)',
  },
}));

export const LinkButton = withStyles((theme) => ({
  root: {
    height: 30,
    color: '#3757ffc7',
    backgroundColor: '#f3f7ff',
    '&:hover': {
      backgroundColor: '#E3E6F7',
    },
    minWidth: 100,
    fontSize: 14,
    width: '100%',
    maxWidth: 350,
  },
  label: {
    paddingLeft: 5,
    whiteSpace: 'nowrap',
    justifyContent: 'space-between;',
    [theme.breakpoints.down(1080)]: {
      paddingLeft: 10,
    },
  },
  endIcon: {
    width: 17,
    marginRight: 10,
    [theme.breakpoints.down(1080)]: {
      marginRight: 20,
    },
  },
}))(Button);
