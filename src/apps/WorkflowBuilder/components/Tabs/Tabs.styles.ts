import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tab: {
    width: '50%',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.common.black90,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.lightblue}`,
    borderRadius: '0 5px 5px 0',
    transition: '.2s all ease-in-out',
    '&:nth-child(2n+1)': {
      borderRadius: '5px 0 0 5px',
    },
  },
  active: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.lightblue,
    '&:hover': {
      backgroundColor: theme.palette.common.lightblue,
    },
  },
}));
