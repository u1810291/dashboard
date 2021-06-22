import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 20,
    marginBottom: 70,
    [theme.breakpoints.down('lg')]: {
      marginBottom: 20,
    },
  },
  gridContainer: {
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
  },
  leftBlock: {
    flex: [[1, 2, '100px']],
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },
  },
  middleBlock: {
    flex: [[1, 1, '500px']],
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  },
  rightBlock: {
    flex: [[1, 2, '200px']],
  },
}));
