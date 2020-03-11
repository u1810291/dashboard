import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  icon: {
    width: 50,
    height: 50,
    padding: [[0, 4]],
    borderRadius: 14,
    // border: [[2, 'solid', '#606060']],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  successBorder: {
    border: [[2, 'solid', '#03a700']],
  },
  failureBorder: {
    border: [[2, 'solid', '#ff6666']],
  },
}));
