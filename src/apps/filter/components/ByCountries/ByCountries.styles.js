import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  status: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    padding: [[20, 20, 5]],
    boxShadow: 'none',
    borderRadius: 3,
    border: `1px solid ${theme.palette.common.black7}`,
  },
}));
