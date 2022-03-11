import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  item: {
    position: 'relative',
    marginBottom: 20,
    padding: '5px 20px 5px 0px',
    '&:nth-child(2n)': {
      padding: '5px 0px 5px 20px',
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
      padding: '10px 40px',
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
        padding: '10px 40px 10px 20px',
        '&::after': {
          display: 'none',
        },
      },
      '&:nth-child(2n)': {
        padding: '10px 40px',
      },
    },
  },
}));
