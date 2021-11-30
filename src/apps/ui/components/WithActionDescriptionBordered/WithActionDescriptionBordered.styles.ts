import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrap: {
    border: `1px solid ${theme.palette.common.black7}`,
    padding: '10px',
    borderRadius: '5px',
  },
  wrapError: {
    borderColor: theme.palette.common.red,
  },
  description: {
    color: theme.palette.text.main,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    width: '60%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  error: {
    color: theme.palette.common.red,
    display: 'inline-block',
    marginTop: 3,
  },
}));
