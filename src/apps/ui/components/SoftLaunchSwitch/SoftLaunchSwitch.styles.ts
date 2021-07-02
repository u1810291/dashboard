import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    padding: '10px 20px',
    fontWeight: 'bold',
    backgroundColor: '#D8E3FF',
    color: theme.palette.common.lightblue,
  },
  button: {
    minWidth: 180,
    marginLeft: 20,
    fontSize: 14,
    lineHeight: 1.3,
    borderRadius: 6,
    borderColor: theme.palette.common.lightblue,
  },
}));
