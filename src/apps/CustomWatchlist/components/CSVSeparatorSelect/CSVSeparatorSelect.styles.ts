import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  title: {
    color: theme.palette.common.black75,
  },
  selectWrap: {
    width: 60,
  },
  select: {
    '&.MuiInputBase-root': {
      textAlign: 'center',
      fontWeight: 'bold',
      background: 'transparent',
      fontSize: 17,
      color: theme.palette.common.black75,
      '&:before, &:after': {
        display: 'none',
      },
    },
  },
  marginTop20: {
    marginTop: 20,
  },
  red: {
    color: theme.palette.common.red,
  },
  menuItemLabel: {
    display: 'inline-block',
    marginRight: '5px',
    textTransform: 'capitalize',
    color: theme.palette.common.black75,
  },
}));
