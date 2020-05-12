import { Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  activeItem: {
    '& [role="menuitem"]': {
      background: 'rgba(255, 255, 255, 0.3)',
      '--mgi-application-menu-color': 'white',
      '--mgi-application-menu-icon': 'white',
      borderBottomColor: '#ffffff',
    },
  },
  menuItem: {
    color: 'white',
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
