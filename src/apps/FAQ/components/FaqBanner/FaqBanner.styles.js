import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  banner: {
    background: theme.palette.common.white,
    boxShadow: [[0, 2, 4, 'rgba(52, 73, 94, 0.1)']],
    borderRadius: '4px',
    padding: [[14, 20, 14, 20]],
  },
  boxWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'stretch',
  },
  boxCaption: {
    flexGrow: 0,
  },
  boxEmail: {
    flexGrow: 0,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
    },
  },
  boxWithMerchantId: {
    flexGrow: 1,
    marginLeft: 41,
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      order: 2,
      width: '100%',
      flexWrap: 'wrap',
      marginLeft: 0,
    },
  },
  email: {
    color: '#507DED',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  merchantId: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#507DED',
  },
  yourMerchantId: {
    marginLeft: 10,
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 20,
      paddingBottom: 10,
      marginLeft: 0,
      width: '100%',
    },
  },
}));
