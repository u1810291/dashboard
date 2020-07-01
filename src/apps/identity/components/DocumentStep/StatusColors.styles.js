import { makeStyles } from '@material-ui/core/styles';

export const useStatusColors = makeStyles((theme) => ({
  success: {
    color: theme.palette.common.green,
  },
  failure: {
    color: theme.palette.common.red,
  },
}));
