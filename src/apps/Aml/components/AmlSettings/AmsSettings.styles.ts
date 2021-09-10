import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  arrow: {
    display: 'block',
    width: 15,
    height: 25,
    transform: 'translateY(-15px)',
    borderLeft: `1px solid ${theme.palette.common.black7}`,
    borderBottom: `1px solid ${theme.palette.common.black7}`,
  },
}));
