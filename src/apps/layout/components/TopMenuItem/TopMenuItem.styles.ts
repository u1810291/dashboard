import { makeStyles } from '@material-ui/styles';
import { AppTheme } from 'apps/theme';

export const useStyles = makeStyles<typeof AppTheme, {color: string}>((theme) => ({
  desktopActive: {
    '& [role="menuitem"]': {
      background: theme.palette.background.hover,
    },
  },
  mobileActive: {
    '& [role="menuitem"]': {
      background: theme.palette.background.hover,
      borderLeft: `3px solid ${theme.palette.primary.main}`,
    },
  },
  menuItem: {
    minHeight: 50,
    alignItems: 'center',
    lineHeight: 1,
    fontWeight: 'bold',
    borderBottom: '2px solid transparent',
    padding: '6px 22px',
    transition: 'none',
    '&:hover': {
      background: theme.palette.background.hover,
    },
    '&:focus': {
      background: theme.palette.background.focus,
    },
  },
  outlined: (props) => ({
    border: '2px solid',
    borderRadius: 50,
    borderColor: props.color,
    width: '100%',
  }),
  withOutlinedPadding: {
    padding: '5px 10px',
  },
  textBox: {
    color: theme.palette.text.light,
  },
  icon: (props) => ({
    border: '2px solid',
    borderColor: props.color,
    borderRadius: 50,
    padding: '5px 5px',
    marginLeft: -7,
  }),
}));
