import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
  },
  wrapper: {
    height: '100%',
    padding: [[35, 20]],
    [theme.breakpoints.up('md')]: {
      padding: [[35, 40]],
    },
  },
  title: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  text: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  itemsWrapper: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
  itemWrapper: {
    display: 'flex',
  },
  item: {
    padding: [[0, 0, 0, 20]],
    '&:first-child': {
      maxWidth: 150,
      padding: [[0, 20, 0, 0]],
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      borderRightColor: theme.palette.common.black7,
    },
    '@media (min-width: 375px)': {
      padding: [[0, 0, 0, 40]],
      '&:first-child': {
        padding: [[0, 40, 0, 0]],
      },
    },
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      padding: [[0, 0, 0, 30]],
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: 1,
        backgroundColor: theme.palette.common.black7,
      },
      '&:first-child': {
        padding: [[0, 30, 0, 0]],
        '&::after': {
          display: 'none',
        },
      },
    },
    [theme.breakpoints.up('lg')]: {
      padding: [[0, 0, 0, 40]],
      '&:first-child': {
        padding: [[0, 40, 0, 0]],
      },
    },
  },
}));
