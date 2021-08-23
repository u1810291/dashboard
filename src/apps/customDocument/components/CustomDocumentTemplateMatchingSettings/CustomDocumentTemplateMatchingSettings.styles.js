import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  helpText: {
    color: '#8392B8',
    marginBottom: '10px',
  },
  settingRowHolder: {
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid #507DED',
    width: '54px',
    height: '27px',
    fontSize: '14p',
    color: '#507DED',
    minHeight: '0 !important',
  },
  editButton: {
    display: 'flex !important',
    padding: '2px',
    minWidth: '14px',
    minHeight: '14px !important',
    color: '#507DED',
    marginRight: '10px',
    verticalAlign: 'text-top',
  },
  deleteButton: {
    display: 'flex !important',
    padding: '2px',
    minWidth: '14px',
    minHeight: '14px !important',
    color: '#FE7581',
    verticalAlign: 'text-top',
  },
  buttonsHolder: {
    display: 'flex',
  },
  settingRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  addIcon: {
    marginRight: '3px',
    display: 'inline-block',
  },
  secondCaption: {
    marginBottom: '6px',
  },
  input: {
    marginBottom: '180px',
    width: '100%',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato',
    lineHeight: '17px',
    borderColor: '#8392B8',
    borderRadius: '5px',
    marginBottom: '200px',
    resize: 'none',
    '&::placeholder': {
      color: '#CBD2E2',
    },
  },
  back: {
    width: '100%',
  },
  continue: {
    width: '100%',
  },
  title: {
    marginBottom: '42px',
  },
  tag: {
    width: '100%',
    backgroundColor: '#EDF2FD',
    borderRadius: '5px',
    color: '#507DED',
    display: 'flex',
    verticalAlign: 'top',
    marginBottom: '5px',
    padding: '7px 10px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
  },
  chevronLeft: {
    marginRight: '7px',
  },
}));
