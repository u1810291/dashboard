import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';
import { CustomWatchlistSeverityOnMatchTypes } from 'models/CustomWatchlist.model';

export const useStyles = makeStyles((theme) => createStyles({
  placeholder: {
    color: theme.palette.text.disabled,
  },
  actionSelect: {
    '&.MuiInputBase-root': {
      height: 50,
    },
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
