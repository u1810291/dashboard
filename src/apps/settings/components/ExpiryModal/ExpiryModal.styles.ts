import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  expiryModal: {
    width: 380,
    minHeight: '100px',
  },
  buttonsGroup: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    left: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '14px',
    alignItems: 'center',
    marginTop: '14px',
  },
  button: {
    minWidth: '290px',
  },
}));
