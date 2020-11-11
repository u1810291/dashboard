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
  wrapperApi: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '30%',
      flexBasis: '30%',
    },
  },
  wrapperApiFlow: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '23%',
      flexBasis: '23%',
    },
  },
  arrow: {
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(90deg)',
    },
  },
  imageEntryPoint: {
    [theme.breakpoints.up('xl')]: {
      width: 258,
    },
  },
  mobileFlow: {
    width: 83,
    [theme.breakpoints.up('xl')]: {
      width: 125,
    },
  },
  webFlow: {
    width: 114,
    [theme.breakpoints.up('xl')]: {
      width: 170,
    },
  },
  imageResult: {
    [theme.breakpoints.down('md')]: {
      width: 215,
    },
  },
}));
