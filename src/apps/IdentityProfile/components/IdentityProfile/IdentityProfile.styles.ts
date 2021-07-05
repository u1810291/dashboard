import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  sidebar: {
    [theme.breakpoints.up('lg')]: {
      width: 290,
      flexBasis: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 350,
    },
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 290px)',
      flexBasis: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'calc(100% - 350px)',
    },
  },
}));
