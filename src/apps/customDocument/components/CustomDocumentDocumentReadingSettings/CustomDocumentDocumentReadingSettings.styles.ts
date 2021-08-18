import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  helpText: {
    color: theme.palette.common.black75,
    marginBottom: '10px',
  },
  settingRowHolder: {
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  activePageButton: {
    backgroundColor: theme.palette.common.whiteblue,
  },
  logoPreview: {
    maxWidth: 230,
    maxHeight: 190,
    backgroundSize: 'cover',
    width: 'auto',
    height: 'auto',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: `1px solid ${theme.palette.common.lightblue}`,
    width: '54px',
    height: '27px',
    fontSize: '14p',
    color: theme.palette.common.lightblue,
    minHeight: '0 !important',
  },
  pageButton: {
    display: 'inline-block',
    padding: '2px',
    minWidth: '30px ',
    minHeight: '14px !important',
    border: `1px solid ${theme.palette.common.lightblue}`,
    color: theme.palette.common.lightblue,
    marginRight: '10px',
    verticalAlign: 'text-top',
    marginBottom: '21px',
    '&> span': {
      display: 'flex !important',
    },
  },
  pageButtonsHolder: {
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
  pageDeleteButton: {
    display: 'flex !important',
    color: theme.palette.common.red,
    verticalAlign: 'center',
    justifyContent: 'center !important',
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
    width: '100%',
    paddingBottom: '10px',
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
    backgroundColor: theme.palette.common.whiteblue,
    borderRadius: '5px',
    color: theme.palette.common.lightblue,
    display: 'flex',
    verticalAlign: 'top',
    padding: '7px 10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
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
  uploadBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px',
    marginBottom: '10px',
    height: '300px',
    border: `1px dashed ${theme.palette.common.black50}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
  },
  fileInput: {
    width: '200px',
    height: '50px',
    border: `1px solid ${theme.palette.common.lightblue}`,
    borderRadius: '6px',
  },
  uploadIcon: {
    marginRight: '10px',
    height: '17px',
    width: '17px',
    verticalAlign: 'middle',
  },
  dropzoneHolder: {
    padding: '16px 30px',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.common.lightblue}`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  chevronLeft: {
    marginRight: '7px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontFamily: 'Lato',
    lineHeight: '17px',
    borderColor: theme.palette.common.black75,
    borderRadius: '5px',
    resize: 'none',
    '&::placeholder': {
      color: theme.palette.common.black50,
    },
  },
}));
