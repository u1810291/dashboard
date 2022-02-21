import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  inputLabel: {
    lineHeight: 1.2,
    whiteSpace: 'pre-wrap',
    marginBottom: 5,
    width: 'calc(100% - 82px)',
  },
  input: {
    width: '82px',
    '& input': {
      padding: 10,
    },
  },
  error: {
    color: theme.palette.common.red,
  },
}));
