import { makeStyles } from '@material-ui/core/styles';
import { TableRow, withStyles } from '@material-ui/core';

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
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
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
      '&:first-child': {
        borderRadius: [[4, 0, 0, 4]],
        padding: [[10, 0, 10, 22]],
      },
      '&:last-child': {
        borderRadius: [[0, 4, 4, 0]],
        padding: [[10, 31, 10, 0]],
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
  itemName: {
    color: theme.palette.common.black75,
    marginLeft: '25px',
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  arrow: {
    height: '12px',
    width: '12px',
    transform: 'rotate(45deg)',
    borderWidth: [[1, 1, 0, 0]],
    border: '1px solid #507DED',
  },
}));
