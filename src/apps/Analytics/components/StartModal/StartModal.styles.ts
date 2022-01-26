import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    minHeight: '562px',
    minWidth: '564px',
    margin: 0,
    padding: 0,
    bottom: '-10px',
    left: 0,
  },
  svg: {
    position: 'absolute',
    left: 0,
  },
  buttonsGroup: {
    height: '562px',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    left: 0,
    bottom: '46px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '13px',
    alignItems: 'center',
  },
  button: {
    minWidth: '320px',
  },
}));
