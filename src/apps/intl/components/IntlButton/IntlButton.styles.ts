import { makeStyles, Select, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, {fullLabel: boolean}>((theme) => ({
  topMenuItem: (props) => ({
    ...(props.fullLabel && {
      width: '100%',
    }),
    minHeight: 32,
    alignItems: 'center',
    lineHeight: 1,
    fontWeight: 'bold',
    transition: 'none',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    '&:focus': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
  }),
  menuIcon: (props) => ({
    color: theme.palette.common.black7,
    height: 17,
    width: 17,
    overflow: 'inherit',
    ...(props.fullLabel ? {
      position: 'absolute',
      left: 22,
    } : {
      height: 19,
      width: 19,
    }),
  }),
  menuList: {
    minWidth: '150px !important',
    maxWidth: 200,
  },
  select: (props) => ({
    textTransform: 'capitalize',
    width: '100%',
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiSelect-root': {
      paddingLeft: 5,
    },
    ...(props.fullLabel && {
      '& .MuiSelect-root': {
        paddingLeft: 60,
      },
    }),
  }),
  selectItem: {
    position: 'relative',
    padding: '7px 10px 6px',
    color: theme.palette.common.black75,
    '&:hover': {
      backgroundColor: theme.palette.common.black7,
    },
  },
}));

export const SelectLight = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    '&:focus': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.common.black,
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.common.black,
    },
  },
}))(Select);
