import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.common.black7}`,
    padding: '10px',
    height: '100px',
  },
  addLogo: {
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    outline: 'none',
    flexGrow: 1,
  },
  logoPreview: {
    maxWidth: 110,
    maxHeight: 60,
    backgroundSize: 'cover',
    width: 'auto',
    height: 'auto',
  },
  logoText: {
    width: '100%',
    wordBreak: 'break-all',
  },
  actions: {
    height: '100%',
    width: 'auto',
  },
}));
