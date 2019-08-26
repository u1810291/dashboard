import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  toolBar: {
    flexGrow: 1,
    minHeight: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logoItem: {
    marginLeft: 30,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  menuItem: {
    color: 'white',
    minHeight: 50,
  },
  activeItem: {
    '& [role="menuitem"]': {
      background: 'rgba(255, 255, 255, 0.3)',
      '--mgi-application-menu-color': 'white',
      '--mgi-application-menu-icon': 'white',
      borderBottom: '2px solid #ffffff',
    }
  },
  logo: {
    width: 60,
    height: 20,
    minWidth: 60,
    'background-repeat': 'no-repeat'
  },
  countryIcon: {
    position: 'relative'
  }
}));
