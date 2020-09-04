import { makeStyles } from '@material-ui/styles';

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
