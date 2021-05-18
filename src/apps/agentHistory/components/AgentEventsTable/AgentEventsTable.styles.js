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
