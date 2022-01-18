import { makeStyles } from '@material-ui/core/styles';
import { Button, withStyles } from '@material-ui/core';

export const FilterButton = withStyles((theme) => ({
  root: {
    maxWidth: 245,
    width: '100%',
    height: 50,
    fontSize: 14,
    padding: [[6, 10]],
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    color: theme.palette.common.lightblue,
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
    maxWidth: 245,
    width: '100%',
    backgroundColor: theme.palette.common.black7,
  },
  filterOptions: {
    maxHeight: 375,
    overflowY: 'auto',
    overflowX: 'hidden',
    wordBreak: 'break-word',
    scrollbarWidth: 'thin',
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    padding: [[20, 22, 22, 20]],
    marginTop: 9,
    maxWidth: 245,
    width: '100%',
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
  },
}));
