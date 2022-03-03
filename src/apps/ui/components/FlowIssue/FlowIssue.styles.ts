import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
  badge: {
    position: 'absolute',
    top: '50%',
    right: '100%',
    minWidth: 200,
    minHeight: 43,
    marginRight: 14,
    padding: '8px 16px',
    borderRadius: 10,
    fontWeight: 'bold',
    color: theme.palette.common.yellow,
    backgroundColor: theme.palette.common.white,
    transform: 'translateY(-50%)',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: -12,
      top: '50%',
      border: '6px solid transparent',
      borderLeft: `6px solid ${theme.palette.common.white}`,
      transform: 'translateY(-50%)',
    },
  },
}));
