import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  tableHead: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
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
