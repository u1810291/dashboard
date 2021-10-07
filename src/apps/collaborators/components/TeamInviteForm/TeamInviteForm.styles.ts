import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
          padding: '6px 0px',
        },
      },
    },
  },
  form: {
    '@media (min-width: 1280px)': {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },

  wrapper: {
    '@media (min-width: 1280px)': {
      width: 'calc(50% - 20px)',
    },
  },
}));
