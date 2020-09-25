import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  desktopActive: {
    '& [role="menuitem"]': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
  mobileActive: {
    '& [role="menuitem"]': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderLeft: [[3, 'solid', theme.palette.primary.main]],
    },
  },
  menuItem: {
    minHeight: 50,
    alignItems: 'center',
    lineHeight: 1,
    fontWeight: 'bold',
    borderBottom: '2px solid transparent',
    padding: [[6, 22]],
    transition: 'none',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    '&:focus': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
}));
