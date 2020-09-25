import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  addLogo: {
    height: 250,
    maxWidth: 305,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: [[0, 20]],
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    borderRadius: 4,
    border: [[1, 'solid', theme.palette.primary.main]],
    color: theme.palette.primary.main,
    cursor: 'pointer',
    outline: 'none',
  },
  logoPreview: {
    maxWidth: 230,
    maxHeight: 190,
    backgroundSize: 'cover',
    width: 'auto',
    height: 'auto',
  },
  logoText: {
    width: '100%',
    wordBreak: 'break-all',
  },
}));
