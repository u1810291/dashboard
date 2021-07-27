import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  bottomGutter: {
    paddingBottom: 40,
  },
  topGutter: {
    paddingTop: 20,
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
    paddingLeft: 15,
    listStyle: 'decimal',
    color: '#c7c7c7',
  },
  answer: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#c7c7c7',
    // @ts-ignore
    [theme.breakpoints.down('sm')]: {
      paddingRight: 15,
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
    // @ts-ignore
    [theme.breakpoints.up('sm')]: {
      wordBreak: 'keep-all',
      display: 'block',
    },
  },
}));
