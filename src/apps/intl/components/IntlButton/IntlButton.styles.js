import { makeStyles, Select, withStyles } from '@material-ui/core';
import ukImage from 'assets/intl-uk.svg';
import esImage from 'assets/intl-es.svg';
import ptImage from 'assets/intl-pt.svg';

export const useStyles = makeStyles((theme) => ({
  topMenuItem: {
    minHeight: 32,
    padding: '6px 10px',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: theme.palette.common.black7,
    },
  },
  select: {
    paddingLeft: 22,
    textTransform: 'capitalize',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 5,
      height: 17,
      width: 17,
    },
    '&[data-value="en"]': {
      '&::before': {
        background: `url(${ukImage}) no-repeat center center`,
      },
    },
    '&[data-value="es"]': {
      '&::before': {
        background: `url(${esImage}) no-repeat center center`,
      },
    },
    '&[data-value="pt"]': {
      '&::before': {
        background: `url(${ptImage}) no-repeat center center`,
      },
    },
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectItem: {
    position: 'relative',
    padding: '7px 32px 6px',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 10,
      top: '50%',
      height: 17,
      width: 17,
      transform: 'translateY(-50%)',
    },
    '&[data-value="en"]': {
      '&::before': {
        background: `url(${ukImage}) no-repeat center center`,
      },
    },
    '&[data-value="es"]': {
      '&::before': {
        background: `url(${esImage}) no-repeat center center`,
      },
    },
    '&[data-value="pt"]': {
      '&::before': {
        background: `url(${ptImage}) no-repeat center center`,
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.common.whiteblue,
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
