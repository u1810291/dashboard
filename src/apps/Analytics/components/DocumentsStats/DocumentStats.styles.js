import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  item: {
    position: 'relative',
    marginBottom: 20,
    padding: [[5, 20, 5, 0]],
    '&:nth-child(2n)': {
      padding: [[5, 0, 5, 20]],
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: 1,
        backgroundColor: theme.palette.common.black7,
      },
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: 'auto',
      maxWidth: 'none',
      marginBottom: 0,
      padding: [[10, 40]],
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
        padding: [[10, 40, 10, 20]],
        '&::after': {
          display: 'none',
        },
      },
      '&:nth-child(2n)': {
        padding: [[10, 40]],
      },
    },
  },
}));
