import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tabs: {
    overflowX: 'auto',
    overflowY: 'hidden',
    marginLeft: -5,
    marginRight: -5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: [[4, 4, 0, 0]],
    background: '#CBD2E2',
    marginBottom: -1, // for hide shadow
  },
  tab: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8392B8',
    cursor: 'pointer',
    padding: [[12, 16]],
    '&:focus': {
      outline: 'none',
    },
    '&:first-child': {
      borderTopLeftRadius: 4,
    },
    '&:last-child': {
      borderTopRightRadius: 4,
    },
    // '&:after': {
    //   content: '""',
    //   position: 'absolute',
    //   display: 'block',
    //   left: 0,
    //   right: 0,
    //   top: '100%',
    //   height: 4,
    //   backgroundColor: theme.palette.common.white,
    // },
  },
  active: {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 1px 4px rgba(52, 73, 94, 0.1)',
    borderRadius: [[4, 4, 0, 0]],
  },
  body: {
    [theme.breakpoints.up('md')]: {
      borderTopLeftRadius: 0,
    },
  },
  line: {
    width: 1,
    height: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  lineShow: {
    backgroundColor: '#8392B8',
  },
}));
