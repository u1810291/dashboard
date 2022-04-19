import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: 20,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 40,
    },
  },
  statistic: {
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  total: {
    [theme.breakpoints.up('md')]: {
      order: -1,
    },
  },
  chartWrapper: {
    maxWidth: '100%',
  },
  loaderWrapper: {
    height: '80vh',
  },
  completedSteps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 32,
    height: 97,
    minWidth: '100%',
    backgroundColor: theme.palette.common.black50,
    color: theme.palette.common.lightblue,
    fontSize: '18px',
    fontWeight: 700,
  },
  blueSquare: {
    width: 41,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    marginLeft: 15,
    backgroundColor: theme.palette.common.lightblue,
    color: theme.palette.common.black50,
    borderRadius: 5,
  },
  checkIcon: {
    width: 30,
    height: 25,
  },
}));
