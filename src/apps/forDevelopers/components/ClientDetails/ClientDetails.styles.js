import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  name: {
    color: theme.palette.common.black75,
    fontSize: 14,
  },
  code: {
    maxWidth: 'calc(100% - 22px)',
    '& > div > div': {
      maxWidth: 'calc(100% - 27px)',
      overflow: 'hidden',
    },
  },
  button: {
    marginLeft: 4,
    padding: 0,
    color: theme.palette.common.lightblue,
    '& svg': {
      fontSize: 18,
    },
  },
}));
