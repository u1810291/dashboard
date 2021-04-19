import { TableRow, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const TableRowHovered = withStyles((theme) => ({
  root: {
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 20,
      padding: [[20, 0]],
      boxShadow: '0px 1px 5px rgba(52, 73, 94, 0.2)',
      borderRadius: 5,
      backgroundColor: theme.palette.common.white,
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  table: {
    '& .MuiTableCell-root': {
      padding: [[14, 20]],
      border: 'none',
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('md')]: {
        padding: [[0, 20]],
      },
    },
    '& .MuiTableRow-hover:hover, & .MuiTableRow-hover:focus': {
      backgroundColor: theme.palette.common.lightblueopacity,
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
  tableHead: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    color: theme.palette.text.main,
  },
  itemEmpty: {
    height: 'calc(100vh - 370px)',
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.common.white,
    },
    '& svg': {
      maxWidth: '100%',
    },
  },
  itemName: {
    lineHeight: 1.2,
  },
  itemNameEmpty: {
    color: theme.palette.common.black50,
    lineHeight: 1.4,
  },
  itemId: {
    fontSize: 12,
    color: theme.palette.text.main,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
    },
  },
  itemData: {
    [theme.breakpoints.down('md')]: {
      fontWeight: 'bold',
    },
  },
  label: {
    color: theme.palette.text.main,
    fontWeight: 'normal',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  iconDeleteWrapper: {
    width: 36,
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
  iconReviewWrapper: {
    width: 36,
    textAlign: 'right',
    '&.MuiTableCell-root': {
      padding: [[4, 0, 4, 10]],
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: 1,
      bottom: 25,
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
      padding: [[4, 10]],
      opacity: 0,
      transition: '.2s all ease-in-out',
    },
  },
  iconButtonReview: {
    padding: 5,
    backgroundColor: theme.palette.common.yellow,
    borderRadius: 0,
    color: theme.palette.text.secondary,
    '& .MuiSvgIcon-root': {
      fontSize: 15,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.common.yellow,
    },
  },
  loader: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, ${theme.palette.common.white} 70%)`,
  },
  tooltip: {
    maxWidth: 80,
    margin: [[-2, 0, 0, 1]],
    padding: [[6, 8]],
    fontSize: 12,
    lineHeight: 1.2,
    color: theme.palette.common.black7,
    textAlign: 'center',
    backgroundColor: theme.palette.text.secondary,
  },
  tooltipArrow: {
    marginBottom: '-0.68em',
    color: theme.palette.text.secondary,
  },
}));
