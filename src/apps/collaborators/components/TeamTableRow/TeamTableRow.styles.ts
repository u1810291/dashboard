import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  firstNameCell: {
    width: 30,
    cursor: 'pointer',
  },
  roleCell: {
    '&.MuiTableCell-root': {
      width: 120,
    },
    [theme.breakpoints.down('sm')]: {
      '&.MuiTableCell-root': {
        width: '100%',
        marginLeft: 40,
        padding: 0,
        textAlign: 'left',
      },
    },
  },
  blockCell: {
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      '&.MuiTableCell-root': {
        maxWidth: 20,
        width: '100%',
        marginLeft: 40,
        padding: 0,
        textAlign: 'left',
      },
      '& .MuiIconButton-root': {
        padding: 0,
      },
    },
  },
  fullNameCell: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'calc(100% - 60px)',
      flexGrow: 1,
      overflow: 'hidden',
    },
  },
  fullName: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  email: {
    color: theme.palette.text.main,
  },
  blocked: {
    color: theme.palette.common.red,
  },
  unblocked: {
    color: theme.palette.common.lightblue,
  },
  linkIcon: {
    marginLeft: 5,
    color: theme.palette.common.lightblue,
  },
}));
