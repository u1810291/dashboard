import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  icon: {
    height: 30,
    width: 30,
    fill: theme.palette.common.black50,
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
    height: '100%',
    '& p': {
      maxWidth: 300,
    },
  },
}));
