import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export const TableRowHovered = withStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer',
    transition: '.2s all ease-in-out',
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
      borderRadius: 4,
      opacity: 0,
      visibility: 'hidden',
      transition: '.2s all ease-in-out',
      boxShadow: `0 4px 14px ${theme.palette.common.blackopacity}`,
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      borderRadius: 4,
    },
  },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
  table: {
    fontSize: '14px',
    borderSpacing: '0 20px',
    borderCollapse: 'separate',
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      '&:first-child': {
        borderRadius: '4px 0px 0px 4px',
        padding: '10px 0px 10px 22px',
      },
      '&:last-child': {
        borderRadius: '0px 4px 4px 0px',
        padding: '10px 31px 10px 0px',
      },
    },
    '& .MuiBox-root': {
      margin: 0,
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
  },
  itemRow: {
    height: 55,
  },
  itemName: {
    color: theme.palette.common.black75,
    marginLeft: '25px',
  },
  startModal: {
    overflow: 'hidden',
    width: 564,
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrow: {
    height: '11px',
    width: '11px',
    transform: 'rotate(45deg)',
    borderWidth: '1px 1px 0px 0px',
    border: `1px solid ${theme.palette.common.lightblue}`,
  },
  completed: {
    color: theme.palette.common.green,
    fontSize: '12px',
    marginRight: 29,
  },
  completedSteps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 32,
    height: 97,
    minWidth: '100%',
    backgroundColor: theme.palette.common.black50,
    color: theme.palette.common.lightblue,
    fontSize: '18px',
    fontWeight: 700,
  },
  blueSquare: {
    width: 41,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    marginLeft: 15,
    backgroundColor: theme.palette.common.lightblue,
    color: theme.palette.common.black50,
    borderRadius: 5,
  },
  checkIcon: {
    width: 30,
    height: 25,
  },
}));
