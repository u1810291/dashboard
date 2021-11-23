import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  control: {
    display: 'block',
  },
  wrapper: {
    backgroundColor: theme.palette.common.palegray,
    borderRadius: 10,
    display: 'flex',
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
