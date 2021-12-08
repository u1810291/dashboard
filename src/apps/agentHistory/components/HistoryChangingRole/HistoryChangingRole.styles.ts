import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  status: {
    fontWeight: 'bold',
  },
  link: {
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
  role: {
    fontWeight: 'bold',
    fontSize: 12,
    background: theme.palette.common.greentransparent,
    padding: '0 5px',
    border: `1px solid ${theme.palette.common.green}`,
    borderRadius: 2,
  },
}));
