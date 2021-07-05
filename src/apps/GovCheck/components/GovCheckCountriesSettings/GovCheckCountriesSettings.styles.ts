import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  control: {
    display: 'block',
  },
  wrapper: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  icon: {
    height: 17,
    '& svg': {
      width: 17,
      height: 17,
    },
  },
  check: {
    paddingLeft: 27,
    '& label': {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: 0,
    },
    '& .MuiSwitch-root': {
      order: 1,
    },
  },
}));
