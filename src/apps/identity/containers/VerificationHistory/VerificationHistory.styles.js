import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
  },
  search: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
