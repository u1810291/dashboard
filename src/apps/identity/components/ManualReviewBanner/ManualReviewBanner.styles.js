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
    [theme.breakpoints.up('lg')]: {
      marginRight: 20,
    },
  },
  bannerButtonClose: {
    minWidth: 30,
    height: 30,
    marginRight: -30,
    padding: 6,
    fontSize: 16,
    color: theme.palette.common.black90,
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
