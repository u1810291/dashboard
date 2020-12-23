import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
  itemWrapper: {
    display: 'flex',
  },
  item: {
    padding: [[0, 0, 0, 20]],
    '&:first-child': {
      maxWidth: 150,
      width: '100%',
      padding: [[0, 20, 0, 0]],
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      borderRightColor: theme.palette.common.black7,
    },
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      width: '100%',
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
        '&::after': {
          display: 'none',
        },
      },
    },
  },
}));
