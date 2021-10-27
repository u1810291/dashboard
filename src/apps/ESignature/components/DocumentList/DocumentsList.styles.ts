import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  dropComponent: {
    width: 'calc(100%-20px)',
    margin: '15px 0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
  },
  dragItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: '5px',
    background: theme.palette.common.lightblueopacity,
    padding: '10px',
    color: theme.palette.common.lightblue,
    margin: '5px',
    boxShadow: 'none',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  dragButton: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
  },
  actionButton: {
    cursor: 'pointer',
  },
  buttonsGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '10px',
    width: '60px',
  },
}));
