import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: [[30, 10]],
    backgroundColor: theme.palette.common.lightblueopacity,
    borderRadius: 5,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  arrow: {
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(90deg)',
    },
  },
}));
