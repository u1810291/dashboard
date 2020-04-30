import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between',
    border: [[1, 'solid', 'transparent']],
    marginLeft: 0,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-around',
    },
  },
  switcher: {
    marginRight: 10,
  },
}));
