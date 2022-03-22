import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 220;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& .MuiDrawer-paper': {
      zIndex: 1000,
      overflowX: 'hidden',
      scrollbarWidth: 'none',
    },
    '& ::-webkit-scrollbar': {
      width: 0,
    },
    '& a': {
      color: theme.palette.common.black7,
    },
    '@media print': {
      display: 'none',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.text.secondary,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 60,
    backgroundColor: theme.palette.text.secondary,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  grid: {
    flexWrap: 'nowrap',
    height: '100%',
  },
  contentTop: {
    flex: '1 0 auto',
  },
  logo: {
    '&:hover': {
      background: theme.palette.common.whitelightopacity,
    },
    '&:focus': {
      background: theme.palette.common.whitedimopacity,
    },
  },
  contentBottom: {
    flex: '0 0 auto',
  },
  menuDivider: {
    opacity: '0.2',
    backgroundColor: theme.palette.common.black7,
  },
  company: {
    color: theme.palette.common.black7,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  companyShort: {
    width: 30,
    height: 30,
    border: '1px solid #fff',
    borderRadius: '50%',
    textAlign: 'center',
    '& h4': {
      lineHeight: '28px',
    },
  },
  inviteButton: {
    backgroundColor: theme.palette.common.lightblue,
    width: '100%',
    justifyContent: 'flex-start',
    minWidth: 0,
    height: 30,
    borderRadius: 60,
    boxShadow: 'none',
    padding: '3px 8px',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    '& .MuiButton-label': {
      fontSize: 14,
    },
    '& .MuiButton-startIcon': {
      width: 15,
      margin: '0px 8px 0px 0px',
    },
  },
  inviteButtonSm: {
    width: 30,
    padding: '3px 8px',
    '& .MuiButton-startIcon': {
      margin: 0,
    },
  },
  menuButton: {
    width: '100%',
    padding: '6px 22px',
    minHeight: 50,
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    lineHeight: 1,
    borderBottom: '2px solid transparent',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.common.whitelightopacity,
    },
    '& .MuiButton-label': {
      fontSize: 14,
    },
    '& .MuiButton-startIcon': {
      width: 17,
      marginRight: 20,
      marginLeft: 0,
    },
  },
  menuSelect: {
    '& .MuiMenuItem-root': {
      minHeight: 50,
      padding: 0,
      borderRadius: 0,
    },
    '& .MuiMenuItem-root:hover': {
      backgroundColor: theme.palette.common.whitelightopacity,
    },
    '& .MuiSelect-icon': {
      display: 'none',
    },
    '& .MuiInputBase-root': {
      width: '100%',
      padding: 0,
    },
    '& .MuiInputBase-root:before': {
      top: 15,
      left: 22,
    },
    '& .MuiSelect-selectMenu': {
      position: 'relative',
      zIndex: 2,
      height: 50,
      paddingTop: 15,
      color: theme.palette.common.black7,
      fontWeight: 'bold',
      boxSizing: 'border-box',
    },
  },
}));
