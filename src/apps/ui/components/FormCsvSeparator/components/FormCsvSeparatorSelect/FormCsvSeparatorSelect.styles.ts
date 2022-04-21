import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
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
  menuItemLabel: {
    display: 'inline-block',
    marginRight: '5px',
    textTransform: 'capitalize',
    color: theme.palette.common.black75,
  },
}));
