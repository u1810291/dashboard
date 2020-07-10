import { Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  desktopActive: {
    '& [role="menuitem"]': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  },
  mobileActive: {
    '& [role="menuitem"]': {
      background: 'rgba(255, 255, 255, 0.3)',
      borderLeft: [[3, 'solid', theme.palette.primary.main]],
    },
  },
  menuItem: {
    minHeight: 50,
    alignItems: 'center',
    lineHeight: 1,
    borderBottom: '2px solid transparent',
  },
}));

export const MenuBadge = withStyles({
  badge: {
    color: '#232939',
    backgroundColor: '#FFD814',
    borderRadius: 3,
    minWidth: 'auto',
    fontWeight: 'bold',
    padding: [[0, 6]],
  },
})(Badge);
