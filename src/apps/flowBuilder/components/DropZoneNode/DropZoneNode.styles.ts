import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: 300,
    minHeight: 100,
    padding: 10,
    border: `2px dashed ${theme.palette.common.black50}`,
    borderRadius: 10,
  },
}));
