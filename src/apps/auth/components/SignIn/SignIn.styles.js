import { makeStyles } from '@material-ui/core';
import SignInImage from 'assets/signin-bkg.svg';

export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAFAFA',
  },
  signin: {
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
      color: theme.palette.common.black90,
    },
    '& svg': {
      color: theme.palette.common.black75,
    },
    '& .MuiListItem-root': {
      marginBottom: 25,
      marginLeft: -10,
      padding: '0 10px',
    },
  },
  subtitle: {
    color: theme.palette.common.black75,
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
    color: theme.palette.common.black90,
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
  description: {
    width: '100%',
    maxWidth: 'calc(100% - 510px)',
    color: theme.palette.common.black7,
    backgroundColor: theme.palette.common.black90,
    background: `url(${SignInImage}) repeat space left 24px`,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  descriptionWrapper: {
    maxWidth: 440,
    margin: '20px 100px',
    '& > *': {
      marginBottom: 20,
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 890,
      margin: '20px auto',
      '& > *': {
        marginBottom: 40,
      },
    },
  },
  descriptionList: {
    '& > *': {
      marginBottom: 20,
    },
    [theme.breakpoints.up('xl')]: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      '& > *': {
        maxWidth: 'calc(50% - 17px)',
      },
    },
  },
  descriptionTitle: {
    maxWidth: 360,
    fontWeight: 'bold',
    fontSize: 36,
    [theme.breakpoints.up('xl')]: {
      maxWidth: 'none',
    },
  },
  descriptionImage: {
    [theme.breakpoints.up('xl')]: {
      order: -1,
    },
  },
  text: {
    position: 'relative',
    padding: '0 0 0 20px',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: 7,
      borderRadius: '10px',
      backgroundColor: theme.palette.common.lightblue,
    },
  },
  service: {
    maxWidth: 406,
    padding: '20px 50px 15px 15px',
    backgroundColor: theme.palette.common.lightblue,
    borderRadius: 5,
    '& img': {
      marginBottom: 8,
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 510,
    },
  },
  serviceTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
}));
