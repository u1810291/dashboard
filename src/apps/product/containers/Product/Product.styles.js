import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 20,
    marginBottom: 70,
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
  gridContainer: {
    flexWrap: 'nowrap',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  leftBlock: {
    flex: [[1, 2, '250px']],
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },
  },
  middleBlock: {
    flex: [[1, 1, '700px']],
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  },
  rightBlock: {
    flex: [[1, 2, '290px']],
  },
}));
