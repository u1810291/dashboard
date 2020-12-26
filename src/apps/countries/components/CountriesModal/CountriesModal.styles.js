import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  countriesModal: {
    width: 500,
    '& > main': {
      minHeight: 490,
    },
  },
}));
