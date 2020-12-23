import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  banner: {
    height: '100%',
    backgroundColor: theme.palette.common.yellow,
  },
  bannerWrapper: {
    height: '100%',
    padding: [[26, 20]],
  },
  bannerButton: {
    minWidth: 100,
    fontSize: 12,
    lineHeight: 1.5,
    borderColor: theme.palette.common.black90,
    [theme.breakpoints.up('lg')]: {
      marginRight: 20,
    },
  },
}));
