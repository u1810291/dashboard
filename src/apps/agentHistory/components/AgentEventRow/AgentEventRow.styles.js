import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tableRow: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      marginBottom: 20,
      padding: 20,
      borderRadius: 5,
      backgroundColor: theme.palette.common.white,
      boxShadow: '0px 1px 4px rgba(52, 73, 94, 0.1)',
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
  },
  tableCell: {
    borderColor: theme.palette.common.black7,
    '&:first-child': {
      verticalAlign: 'baseline',
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
  tableCellExpand: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  buttonExpand: {
    height: 40,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  chevronUp: {
    transform: 'rotate(0.5turn)',
  },
}));
