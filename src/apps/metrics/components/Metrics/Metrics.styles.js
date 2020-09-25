import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 15,
    },
  },
}));
