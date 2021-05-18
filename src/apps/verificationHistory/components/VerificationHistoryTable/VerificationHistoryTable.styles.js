import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  tableContainer: {
    maxHeight: 'calc(100vh - 165px)',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 185px)',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: 5,
        width: 5,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.common.black7,
        borderRadius: 10,
      },
    },
  },
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
      verticalAlign: 'top',
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
    verticalAlign: 'top',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  buttonExpand: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    '& svg': {
      marginLeft: 8,
    },
  },
  loader: {
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, ${theme.palette.common.white} 70%)`,
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
}));
