import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.common.black7}`,
  },
  wrapper: {
    [theme.breakpoints.down('lg')]: {
      flexBasis: 'auto',
      maxWidth: 'initial',
      marginBottom: 10,
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 30,
    },
    [theme.breakpoints.up('xl')]: {
      margin: [[-10, 20, -10, -10]],
    },
  },
  dateWrapper: {
    [theme.breakpoints.up('xl')]: {
      flexBasis: 'calc(25% + 20px)',
      maxWidth: 'calc(25% + 20px)',
    },
  },
  numberWrapper: {
    [theme.breakpoints.up('xl')]: {
      flexBasis: 'calc(33.33% - 20px)',
      maxWidth: 'calc(33.33% - 20px)',
    },
  },
  buttons: {
    [theme.breakpoints.down('lg')]: {
      flexBasis: 'auto',
      maxWidth: 'initial',
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
