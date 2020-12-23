import { makeStyles } from '@material-ui/core/styles';
import { IdentityStatuses } from '../../../../models/Identity.model';

export const useStyles = makeStyles((theme) => ({
  status: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    padding: [[20, 20, 5]],
    boxShadow: 'none',
    borderRadius: 3,
    border: `1px solid ${theme.palette.common.black7}`,
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
  [IdentityStatuses.running]: {
    color: theme.palette.common.black50,
  },
}));
