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
      color: theme.palette.common.black75,
    },
    '& .MuiSelect-root.MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 9px)',
      fontSize: 16,
      color: theme.palette.common.black75,
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
  },
  firstName: {
    width: 30,
    height: 30,
    fontWeight: 'bold',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.common.lightblue}`,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      marginTop: 5,
    },
  },
  fullName: {
    fontWeight: 'bold',
    color: theme.palette.common.black90,
  },
  email: {
    color: theme.palette.common.black75,
  },
  tableButton: {
    marginLeft: 20,
  },
}));
