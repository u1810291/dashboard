import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  buttonExpand: {
    height: 40,
    fontSize: 14,
    color: theme.palette.common.black90,
  },
  tableRow: {
    '&:last-child .MuiTableCell-root': {
      borderBottom: 'none',
    },
    tableRow: {
      [theme.breakpoints.down('md')]: {
        display: 'block',
        padding: 20,
      },
    },
  },
  tableCell: {
    '&:first-child': {
      paddingLeft: 0,
      verticalAlign: 'baseline',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    [theme.breakpoints.down('md')]: {
      display: 'block',
      marginBottom: 20,
      padding: 0,
      border: 'none',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  chevronUp: {
    transform: 'rotate(0.5turn)',
  },
}));
