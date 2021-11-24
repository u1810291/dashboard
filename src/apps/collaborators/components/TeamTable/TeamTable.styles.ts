import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableContainer: {
    overflow: 'initial',
  },
  table: {
    '& .MuiTableCell-root': {
      padding: '10px',
      border: 'none',
    },
    '& .MuiTableCell-root:first-of-type': {
      padding: '10px 0',
    },
    '& .MuiTableCell-root:last-of-type': {
      paddingRight: 0,
    },
    '& .MuiSelect-root': {
      minWidth: 40,
      color: theme.palette.text.main,
    },
    '& .MuiSelect-root.MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 9px)',
      fontSize: 16,
      color: theme.palette.text.main,
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiTableRow-root': {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  },
  tablePlaceholder: {
    [theme.breakpoints.down('sm')]: {
      '&.MuiTableRow-root': {
        justifyContent: 'center',
      },
    },
  },
  firstNameCell: {
    width: 30,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  roleCell: {
    [theme.breakpoints.down('sm')]: {
      '&.MuiTableCell-root': {
        width: '100%',
        marginLeft: 40,
        padding: 0,
        textAlign: 'left',
      },
    },
  },
  fullNameCell: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'calc(100% - 40px)',
      overflow: 'hidden',
    },
    cursor: 'pointer',
  },
  fullName: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  email: {
    color: theme.palette.text.main,
  },
  profileButton: {
    minWidth: 120,
    padding: 4,
    borderColor: theme.palette.common.lightblue,
    color: theme.palette.common.lightblue,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.whiteblue,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 6,
    },
  },
  tableButton: {
    marginLeft: 20,
  },
  linkIcon: {
    marginLeft: 5,
    color: theme.palette.common.lightblue,
  },
}));
