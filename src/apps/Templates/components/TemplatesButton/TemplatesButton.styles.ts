import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  templatesButton: {
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
    minWidth: 120,
    height: 43,
    minHeight: 43,
    marginLeft: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
}));
