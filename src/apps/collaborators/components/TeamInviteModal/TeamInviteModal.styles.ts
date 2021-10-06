import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    [theme.breakpoints.up('lg')]: {
      width: 670,
    },
  },
}));
