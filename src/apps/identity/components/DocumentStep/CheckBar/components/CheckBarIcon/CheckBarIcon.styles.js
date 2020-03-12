import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  icon: {
    width: 50,
    height: 50,
    padding: [[0, 4]],
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  successBorder: {
    border: [[2, 'solid', '#46CB9B']],
  },
  failureBorder: {
    border: [[2, 'solid', '#ff6666']],
  },
}));
