import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  wrapper: {
    backgroundColor: theme.palette.common.palegray,
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
  arrow: {
    display: 'block',
    width: 15,
    height: 25,
    transform: 'translateY(-15px)',
    borderLeft: `1px solid ${theme.palette.common.black7}`,
    borderBottom: `1px solid ${theme.palette.common.black7}`,
  },
}));
