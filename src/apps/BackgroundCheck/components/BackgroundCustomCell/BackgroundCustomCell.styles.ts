import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  colorGrey: {
    color: theme.palette.text.main,
  },
  name: {
    color: theme.palette.text.secondary,
    paddingBottom: '5px',
  },
}));
