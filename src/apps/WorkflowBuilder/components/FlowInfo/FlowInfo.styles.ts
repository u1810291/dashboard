import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  name: {
    wordBreak: 'break-word',
  },
  field: {
    '& .MuiIconButton-root': {
      minHeight: 'auto',
      fontSize: 20,
    },
  },
  button: {
    marginRight: 20,
    padding: 0,
  },
}));
