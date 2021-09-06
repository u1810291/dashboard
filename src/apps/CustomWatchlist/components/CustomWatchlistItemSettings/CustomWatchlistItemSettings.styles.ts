import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    borderRadius: 3,
    border: `1px solid ${theme.palette.common.black7}`,
  },
  button: {
    width: 30,
    height: 30,
    padding: 0,
  },
  buttonEdit: {
    color: theme.palette.common.lightblue,
    backgroundColor: theme.palette.common.whiteblue,
  },
  buttonTrash: {
    marginLeft: 10,
    color: theme.palette.common.red,
    backgroundColor: theme.palette.common.redopacity,
  },
  buttonAdd: {
    minWidth: 180,
    minHeight: 50,
    fontSize: 14,
    borderColor: theme.palette.common.lightblue,
  },
  matchFollowsTo: {
    display: 'flex',
  },
  colorGrey: {
    color: theme.palette.common.black75,
  },
  colorGreen: {
    color: theme.palette.common.green,
  },
  colorRed: {
    color: theme.palette.common.red,
  },
  skeletonWrap: {
    border: `1px solid ${theme.palette.common.black7}`,
    borderRadius: 3,
    padding: 20,
    height: 154,
  },
}));
