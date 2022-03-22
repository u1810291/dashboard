import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  avatarWrapper: {
    [theme.breakpoints.down('md')]: {
      flexWrap: 'nowrap',
    },
  },
}));
