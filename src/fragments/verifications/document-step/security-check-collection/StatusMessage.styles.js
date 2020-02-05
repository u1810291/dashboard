import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  success: {
    color: 'green',
  },
  failure: {
    color: 'red',
  },
  checking: {
    color: 'inherit',
  },
}));
