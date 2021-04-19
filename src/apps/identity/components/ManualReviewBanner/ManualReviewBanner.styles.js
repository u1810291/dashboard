import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundColor: theme.palette.common.yellow,
  },
  bannerWrapper: {
    flexDirection: 'column',
    padding: [[14, 10]],
    '@media (min-width: 375px)': {
      padding: [[14, 20]],
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      padding: [[10, 20]],
    },
  },
  bannerText: {
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
    [theme.breakpoints.down('md')]: {
      marginBottom: 10,
      textAlign: 'center',
    },
  },
  bannerButton: {
    minWidth: 150,
    fontSize: 12,
    lineHeight: 1.5,
    borderColor: theme.palette.text.secondary,
    [theme.breakpoints.up('lg')]: {
      marginRight: 20,
    },
  },
  bannerButtonVerifications: {
    '@media (max-width: 480px)': {
      width: '100%',
      marginBottom: 10,
    },
  },
  bannerButtonMode: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.text.secondary,
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
    },
    '@media (max-width: 480px)': {
      width: '100%',
      marginLeft: 0,
    },
    '&:hover, &:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  bannerButtonModeFilter: {
    '@media (max-width: 480px)': {
      width: 'calc(100% - 40px)',
    },
  },
  bannerButtonClose: {
    minWidth: 30,
    height: 30,
    marginRight: -30,
    padding: 6,
    fontSize: 16,
    color: theme.palette.text.secondary,
    '@media (min-width: 375px)': {
      minWidth: 40,
      marginRight: -40,
      fontSize: 20,
    },
    [theme.breakpoints.up('lg')]: {
      margin: [[0, -20]],
    },
  },
}));
