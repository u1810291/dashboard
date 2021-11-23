import { makeStyles } from '@material-ui/core';
import SignInImage from 'assets/signin-bkg.svg';

export const useStyles = makeStyles((theme) => ({
  description: {
    width: '100%',
    maxWidth: 'calc(100% - 510px)',
    color: theme.palette.common.black7,
    backgroundColor: theme.palette.text.secondary,
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
