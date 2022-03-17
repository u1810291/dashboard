import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const TableRowHovered = withStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
    borderRadius: 10,
    '&:last-of-type': {
      marginBottom: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      bottom: 0,
      left: 10,
      display: 'table-cell',
      width: 'calc(100% - 20px)',
      height: 10,
      borderRadius: 10,
      opacity: 0,
      visibility: 'hidden',
      transition: '.2s all ease-in-out',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      width: '90%',
      marginLeft: '10%',
      flexDirection: 'column',
      marginBottom: 20,
      padding: [[20, 0]],
      borderRadius: 10,
    },
  },
}))(TableRow);

export const CustomSwitcher = withStyles((theme) => ({
  root: {
    width: 35,
    height: 21,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.common.green,
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: theme.palette.common.green,
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.common.black50,

      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 17,
      height: 17,
    },
    '& .MuiSwitch-track': {
      borderRadius: 21 / 2,
      backgroundColor: theme.palette.common.black50,
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  },
}))(Switch);

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  table: {
    [theme.breakpoints.up('lg')]: {
      borderCollapse: 'separate',
      borderSpacing: '0 20px',
      width: '95%',
      marginLeft: '5%',
    },
    '& .MuiTableCell-root': {
      padding: [[0, 20]],
      border: 'none',
      [theme.breakpoints.up('lg')]: {
        padding: [[24, 20]],
        '&:first-child': {
          borderRadius: [[10, 0, 0, 10]],
        },
        '&:last-child': {
          borderRadius: [[0, 10, 10, 0]],
        },
      },
    },
    '& .MuiTableRow-hover:hover, & .MuiTableRow-hover:focus': {
      backgroundColor: theme.palette.common.white,
      '&::after': {
        opacity: 1,
        visibility: 'visible',
      },
      [theme.breakpoints.up('lg')]: {
        '& .MuiIconButton-root': {
          opacity: 1,
        },
      },
    },
    '& .MuiTableSortLabel-icon': {
      marginLeft: 10,
      marginTop: 2,
    },
    '& .MuiCircularProgress-root': {
      color: theme.palette.common.black50,
    },
  },
  title: {
    color: theme.palette.text.main,
  },
  itemEmpty: {
    height: 'calc(100vh - 190px)',
    '& svg': {
      maxWidth: '100%',
    },
  },
  itemType: {
    fontWeight: 'bold',
    color: theme.palette.common.black90,
    textTransform: 'uppercase',
  },
  itemTypeBlocked: {
    fontWeight: 'bold',
    color: theme.palette.common.black75,
    textTransform: 'uppercase',
  },
  itemId: {
    fontWeight: 'bold',
    color: theme.palette.common.black90,
  },
  itemIdBlocked: {
    fontWeight: 'bold',
    color: theme.palette.common.black75,
  },
  tableLabel: {
    display: 'flex',
    width: '95%',
    marginLeft: '5%',
    marginTop: 30,
    color: theme.palette.common.black75,
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  nameHeader: {
    width: 500,
    paddingLeft: 20,
  },
  idHeader: {
    width: 350,
    paddingLeft: 25,
  },
  typeHeader: {
    width: 200,
    paddingLeft: 20,
  },
  label: {
    color: theme.palette.common.black75,
    fontWeight: 'normal',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  nameCell: {
    width: 500,
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  typeCell: {
    width: 200,
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  description: {
    paddingTop: 10,
    fontWeight: 'normal',
    fontSize: '12px',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      fontWeight: 'bold',
    },
  },
  itemName: {
    fontSize: 14,
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
  switcher: {
    [theme.breakpoints.down('md')]: {
      top: '45%',
    },
    position: 'absolute',
    top: '40%',
    left: -50,
  },
  iconDeleteWrapper: {
    width: 48,
    textAlign: 'right',
    '&.MuiTableCell-root': {
      padding: [[4, 0]],
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: 1,
      top: 10,
      right: 10,
      '&.MuiTableCell-root': {
        padding: 0,
      },
    },
  },
  iconButtonDelete: {
    padding: 10,
    fontSize: 17,
    [theme.breakpoints.up('lg')]: {
      marginRight: 10,
      opacity: 0,
      transition: '.2s all ease-in-out',
    },
  },
}));
