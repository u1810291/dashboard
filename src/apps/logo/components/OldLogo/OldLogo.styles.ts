import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  addLogo: {
    height: 250,
    maxWidth: 305,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: [[0, 20]] as any,
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    borderRadius: 4,
    border: [[1, 'solid', theme.palette.primary.main]] as any,
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
