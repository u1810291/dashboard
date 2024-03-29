import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    lineHeight: 1.1,
  },
  name: {
    color: theme.palette.text.main,
    fontSize: 14,
  },
  code: {
    maxWidth: 'calc(100% - 22px)',
    lineHeight: 1.1,
    '& > div > div': {
      maxWidth: 'calc(100% - 27px)',
      overflow: 'hidden',
    },
    '& svg': {
      color: theme.palette.common.lightblue,
    },
  },
  codeSecret: {
    display: 'block',
    overflow: 'hidden',
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
