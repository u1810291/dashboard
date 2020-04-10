import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    flexWrap: 'nowrap',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  leftBlock: {
    flex: [[1, 2, '250px']],
    [theme.breakpoints.down('md')]: {
      order: 5,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },
  },
  middleBlock: {
    flex: [[1, 1, '700px']],
    [theme.breakpoints.down('md')]: {
      width: '100%',
      order: 15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  },
  rightBlock: {
    flex: [[1, 2, '290px']],
    [theme.breakpoints.down('md')]: {
      order: 10,
    },
  },
}));
