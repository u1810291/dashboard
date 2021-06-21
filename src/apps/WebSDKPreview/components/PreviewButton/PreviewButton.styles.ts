import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: 510,
    padding: 20,
    userSelect: 'none',
  },
  button: {
    minWidth: 230,
  },
}));
