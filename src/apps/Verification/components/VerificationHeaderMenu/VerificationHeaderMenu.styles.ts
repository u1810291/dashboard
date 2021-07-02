import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.common.black7}`,
  },
  wrapper: {
    [theme.breakpoints.up('xl')]: {
      flexWrap: 'nowrap',
    },
  },
  verification: {
    flexBasis: 'auto',
    maxWidth: 'none',
    marginBottom: 10,
    [theme.breakpoints.up('lg')]: {
      marginBottom: 30,
    },
    [theme.breakpoints.up('xl')]: {
      flexGrow: 1,
      marginBottom: -10,
    },
  },
  dateWrapper: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'calc(25% - 15px)',
      maxWidth: 'calc(25% - 15px)',
    },
  },
  numberWrapper: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'calc(33.33% + 15px)',
      maxWidth: 'calc(33.33% + 15px)',
    },
  },
  buttons: {
    flexBasis: 'auto',
    maxWidth: 'none',
    [theme.breakpoints.up('xl')]: {
      width: 'auto',
      flexWrap: 'nowrap',
      marginLeft: 10,
    },
    [theme.breakpoints.up(2560)]: {
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 170,
    },
  },
  deleteButtonWrapper: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: 170,
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: 0,
    },
  },
  button: {
    border: '1px solid',
    boxShadow: 'none',
    [theme.breakpoints.down(1120)]: {
      overflow: 'visible',
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  deleteButton: {
    color: theme.palette.common.red,
    borderColor: theme.palette.common.red,
  },
  topMenuButton: {
    borderColor: theme.palette.common.black75,
  },
  label: {
    [theme.breakpoints.down(1120)]: {
      paddingLeft: 5,
    },
  },
  startIcon: {
    [theme.breakpoints.down(1120)]: {
      marginRight: 10,
    },
  },
}));
