import { makeStyles } from '@material-ui/styles';

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
