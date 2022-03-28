import { makeStyles } from '@material-ui/styles';
import { appPalette } from 'apps/theme/app.palette';

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
  outlined: (props) => ({
    border: '2px solid',
    borderRadius: 50,
    borderColor: props.color,
    width: '100%',
  }),
  withOutlinedPadding: {
    padding: [[5, 10]],
  },
  textBox: {
    color: appPalette.black7,
  },
  icon: (props) => ({
    border: '2px solid',
    borderColor: props.color,
    borderRadius: 50,
    padding: [[5, 5]],
    marginLeft: -7,
  }),
}));
