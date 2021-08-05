import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      borderTop: `1px solid ${theme.palette.foreground.main}`,
      paddingTop: 20,
    },
  },
  selector: {
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      flexBasis: 240,
      maxWidth: 240,
    },
  },
  products: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'calc(100% - 240px)',
      maxWidth: 'calc(100% - 240px)',
    },
  },
}));
