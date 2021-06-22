import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { IdentityStatuses } from 'models/Status.model';

export const useStyles = makeStyles((theme) => createStyles({
  node: {
    background: '#FFF',
    padding: 10,
    width: 90,
    border: '1px solid #900',
    height: 30,
  },
  [IdentityStatuses.verified]: {
    color: theme.palette.common.green,
  },
  [IdentityStatuses.reviewNeeded]: {
    color: theme.palette.common.yellow,
  },
  [IdentityStatuses.rejected]: {
    color: theme.palette.common.red,
  },
}));
