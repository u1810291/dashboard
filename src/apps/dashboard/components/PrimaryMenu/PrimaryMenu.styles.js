import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  logoItem: {
    marginLeft: 30,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logo: {
    width: 60,
    height: 20,
    minWidth: 60,
    'background-repeat': 'no-repeat',
  },
}));
