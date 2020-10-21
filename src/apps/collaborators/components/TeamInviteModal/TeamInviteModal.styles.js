import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    [theme.breakpoints.up('lg')]: {
      width: 670,
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      '& > *': {
        width: 'calc(50% - 20px)',
        '&:last-of-type': {
          order: -1,
          justifyContent: 'flex-end',
          padding: [[6, 0]],
        },
      },
    },
  },
}));
