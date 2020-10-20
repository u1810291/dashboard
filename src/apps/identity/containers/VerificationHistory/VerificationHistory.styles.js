import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.black75,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  table: {
    width: '100%',
  },
  paper: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  downloadButton: {
    '@media (max-width: 374.95px)': {
      marginRight: 10,
    },
  },
  banner: {
    backgroundColor: theme.palette.common.yellow,
  },
  bannerWrapper: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  bannerText: {
    color: theme.palette.common.black90,
    lineHeight: 1.2,
    [theme.breakpoints.down('md')]: {
      marginBottom: 10,
      textAlign: 'center',
    },
  },
  bannerButton: {
    minWidth: 160,
    fontSize: 12,
    lineHeight: 1.5,
    borderColor: theme.palette.common.black90,
  },
}));
