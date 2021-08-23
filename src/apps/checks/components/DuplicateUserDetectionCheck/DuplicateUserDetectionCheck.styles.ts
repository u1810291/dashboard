import { Button, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    color: theme.palette.text.main,
    border: 'none',
    filter: 'none',
    boxShadow: 'none',
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
