import { makeStyles } from '@material-ui/core/styles';

export const useStatusColors = makeStyles(() => ({
  success: {
    color: '#03a700',
  },
  failure: {
    color: '#ff6666',
  },
}));
