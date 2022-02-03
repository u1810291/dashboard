import { makeStyles } from '@material-ui/core/styles';
import { Button, withStyles } from '@material-ui/core';

export const FilterButton = withStyles((theme) => ({
  root: {
    width: '100%',
    height: 50,
    fontSize: 14,
    padding: '6px, 10px',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.down(1080)]: {
      width: 50,
      minWidth: 50,
      overflow: 'hidden',
    },
  },
  label: {
    whiteSpace: 'nowrap',
  },
  startIcon: {
    width: 17,
    marginRight: 10,
    [theme.breakpoints.down(1080)]: {
      marginRight: 20,
    },
  },
}))(Button);

export const useStyles = makeStyles((theme) => ({
  buttonName: {
    marginLeft: '20px',
  },
  filterContainer: {
    maxWidth: '13vw',
    width: '100%',
    marginRight: 14,
    '& .MuiButton-contained:not(.MuiButton-containedPrimary)': {
      color: theme.palette.common.lightblue,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #507DED',
    },
  },
  filterOptions: {
    maxHeight: 300,
    maxWidth: '13vw',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    wordBreak: 'break-word',
    boxSizing: 'border-box',
    scrollbarWidth: 'thin',
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    padding: '20px, 22px, 22px, 20px',
    marginTop: '3%',
    zIndex: 200,
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
  filterOption: {
    minWidth: '100%',
    '& .MuiButtonBase-root': {
      minHeight: 20,
    },
  },
}));
