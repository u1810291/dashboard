import { makeStyles } from '@material-ui/core/styles';

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
    '& .MuiTableSortLabel-icon': {
      marginLeft: 10,
      marginTop: 2,
    },
  },
  tableHead: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    '& .MuiTableSortLabel-icon': {
      opacity: 0.7,
      height: 10,
      width: 10,
    },
    '& .MuiTableSortLabel-root:hover': {
      color: theme.palette.common.black90,
    },
    '& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon': {
      opacity: 1,
    },
    [theme.breakpoints.up('lg')]: {
      '& .MuiTableRow-root': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  tableHeadCell: {
    [theme.breakpoints.up('lg')]: {
      width: '20%',
      '&:first-child': {
        width: '36%',
      },
      '&:last-child': {
        width: '24%',
      },
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
  loader: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, ${theme.palette.common.white} 70%)`,
  },
  fixedListCell: {
    '&.MuiTableCell-root': {
      padding: 0,
    },
  },
  fixedList: {
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 4,
      width: 4,
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
}));
