import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  bottomGutter: {
    paddingBottom: 40,
  },
  emailLink: {
    color: '#5082ff',
    textDecoration: 'underline',
    paddingTop: 10,
  },
  supportIcon: {
    height: 25,
  },
  supportIconBox: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 10,
  },
  list: {
    paddingTop: 20,
    paddingLeft: 15,
    listStyle: 'decimal',
    color: '#c7c7c7',
  },
  paper: {
    background: theme.palette.text.secondary,
    color: theme.palette.common.black7,
    paddingRight: 38,
  },
  answer: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#c7c7c7',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 15,
    },
  },
  supportBox: {
    marginLeft: 20,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: 30,
    },
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
  },
  question: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    paddingBottom: 10,
  },
  wrapGrid: {
    marginRight: 15,
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      wordBreak: 'keep-all',
      display: 'block',
    },
  },
  verification: {
    color: '#f4be48',
    wordBreak: 'keep-all',
    [theme.breakpoints.down('sm')]: {
      wordBreak: 'break-all',
    },
  },
}));
