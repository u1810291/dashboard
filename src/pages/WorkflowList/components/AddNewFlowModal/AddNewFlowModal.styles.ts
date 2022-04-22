import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  addFlow: {
    '& img': {
      backgroundColor: theme.palette.common.white,
    },
  },
}));
