import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: '100%',
  },
  buttonsHolder: {
    display: 'flex',
  },
  editButton: {
    display: 'flex !important',
    padding: '2px',
    minWidth: '14px',
    minHeight: '14px !important',
    color: theme.palette.common.lightblue,
    marginRight: '10px',
    verticalAlign: 'text-top',
  },
  deleteButton: {
    display: 'flex !important',
    padding: '2px',
    minWidth: '14px',
    minHeight: '14px !important',
    color: theme.palette.common.red,
    verticalAlign: 'text-top',
  },
  buttonWrap: {
    marginBottom: '39px',
  },
  addButton: {

    '&:disabled': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
      opacity: '.5',
    },
  },
  addButtonFullWidth: {
    width: '100%',
  },
  tag: {
    width: '100%',
    backgroundColor: theme.palette.common.whiteblue,
    borderRadius: '5px',
    color: theme.palette.common.lightblue,
    display: 'flex',
    verticalAlign: 'top',
    marginBottom: '10px',
    fontSize: '17px',
    lineHeight: 1,
    padding: '11px 20px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledTitle: {
    color: theme.palette.common.black90,
    opacity: '0.5',
    marginTop: '20px',
  },
  warningWrap: {
    fontSize: 13,
    textAlign: 'center',
  },
}));
