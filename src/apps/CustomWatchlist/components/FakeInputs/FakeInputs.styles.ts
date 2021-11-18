import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  input: {
    border: `1px solid ${theme.palette.common.black50}`,
    borderRadius: 5,
    padding: 10,
  },
  colorBlue: {
    color: theme.palette.common.lightblue,
  },
}));
