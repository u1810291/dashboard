import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  changePlanWrapper: {
    width: 350,
    maxWidth: 350,
    '& img': {
      marginBottom: '2rem',
      width: 64,
    },
  },
}));
