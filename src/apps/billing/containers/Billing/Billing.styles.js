import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  planActions: {
    marginTop: -10,
    '& button, &a': {
      height: 12,
      width: 40,
    },
    '& button': {
      marginTop: 2,
    },
    '& a': {
      marginTop: 3,
    },
  },
}));
