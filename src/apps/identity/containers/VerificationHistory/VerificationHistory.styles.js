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
}));
