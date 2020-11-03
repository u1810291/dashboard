import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    padding: [[30, 10, 20]],
    border: `1px solid ${theme.palette.common.black7}`,
    borderRadius: 5,
    [theme.breakpoints.up('lg')]: {
      flexWrap: 'nowrap',
      padding: [[25, 20]],
    },
  },
  textWrapper: {
    justifyContent: 'center',
    margin: [[0, 0, 20]],
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
      margin: [[0, 20, 0, 0]],
    },
  },
  buttonWrapper: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 'auto',
    },
  },
  icon: {
    flexShrink: 0,
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: '50%',
    backgroundColor: '#E5F7EE',
    '& svg': {
      color: theme.palette.common.green,
    },
  },
  button: {
    height: '100%',
    minHeight: 50,
    padding: [[5, 10]],
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.common.black75,
    borderColor: theme.palette.common.black7,
    '& svg': {
      marginLeft: 10,
      fontSize: 17,
    },
  },
}));
