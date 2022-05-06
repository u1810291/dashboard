import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';
import { CustomWatchlistSeverityOnMatchTypes } from 'models/CustomWatchlist.model';

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
    width: '100%',
    minHeight: 50,
    fontSize: 14,
    borderColor: theme.palette.common.lightblue,
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
  placeholder: {
    color: theme.palette.text.disabled,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  actionSelect: {
    '&.MuiInputBase-root': {
      height: 50,
    },
  },
  warningWrap: {
    fontSize: 13,
    textAlign: 'center',
  },
  [CustomWatchlistSeverityOnMatchTypes.Low]: {
    color: theme.palette.common.green,
  },
  [CustomWatchlistSeverityOnMatchTypes.Medium]: {
    color: theme.palette.common.orange,
  },
  [CustomWatchlistSeverityOnMatchTypes.Critical]: {
    color: theme.palette.common.red,
  },
}));
