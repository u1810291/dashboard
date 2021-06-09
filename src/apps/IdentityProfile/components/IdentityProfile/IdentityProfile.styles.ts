import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  sidebar: {
    [theme.breakpoints.up('lg')]: {
      width: 270,
      flexBasis: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 370,
    },
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 270px)',
      flexBasis: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'calc(100% - 370px)',
    },
  },
}));
