import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  header: {
    padding: [[10, 20, 10]],
    position: 'fixed',
    top: 0,
    left: 0,
    height: 45,
    width: '100%',
    borderBottom: `1px solid ${theme.palette.common.black7}`,
    zIndex: 2,
    background: theme.palette.common.white,
  },
  body: {
    padding: [[45, 20, 70]],
    [theme.breakpoints.down('sm')]: {
      padding: [[45, 20, 125]],
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 70,
    padding: [[10, 20]],
    zIndex: 2,
    background: theme.palette.common.white,
    borderTop: `1px solid ${theme.palette.common.black7}`,
    [theme.breakpoints.down('sm')]: {
      height: 125,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  hr: {
    height: 1,
    backgroundColor: theme.palette.common.black7,
    marginLeft: -20,
    marginRight: -20,
  },
  checks: {
    '& .MuiFormControlLabel-root': {
      color: theme.palette.text.secondary,
    },
    '& .MuiButtonBase-root': {
      minHeight: 30,
      padding: [[0, 5]],
    },
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  footerRight: {
    marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  submitButton: {
    width: 290,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  resultsText: {
    color: theme.palette.text.main,
  },
  clearButton: {
    color: theme.palette.common.red,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
