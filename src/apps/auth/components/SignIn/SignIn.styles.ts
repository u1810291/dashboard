import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: theme.palette.common.palegray,
  },
  signIn: {
    width: '100%',
    maxWidth: 510,
    margin: '0 auto',
    padding: '0 20px',
  },
  formWrapper: {
    maxWidth: 350,
    margin: '30px auto',
    '& a': {
      color: theme.palette.common.lightblue,
      textDecoration: 'underline',
    },
  },
  appBar: {
    alignItems: 'flex-start',
    marginBottom: 125,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      marginBottom: 60,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      color: theme.palette.text.secondary,
    },
    '& svg': {
      color: theme.palette.text.main,
    },
    '& .MuiListItem-root': {
      marginBottom: 25,
      marginLeft: -10,
      padding: '0 10px',
    },
  },
  subtitle: {
    color: theme.palette.text.main,
    fontWeight: 'normal',
  },
  link: {
    fontSize: 18,
  },
  form: {
    margin: 'auto 0',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
    '& a': {
      color: theme.palette.common.lightblue,
      textDecoration: 'underline',
    },
  },
  inputWrapper: {
    marginBottom: 50,
    '&:last-of-type': {
      marginBottom: 60,
    },
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  button: {
    width: '100%',
    height: 50,
    padding: '15px 22px',
    fontSize: 14,
    backgroundColor: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.lightbluehover,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: 50,
    },
  },
}));
