import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    '& > main': {
      minHeight: 490,
    },
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
  innerTitle: {
    marginBottom: 6,
  },
  subtitle: {
    color: theme.palette.common.black75,
    maxWidth: 300,
  },
  uploadBlock: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px',
    height: '300px',
    border: `1px dashed ${theme.palette.common.black50}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
  },
  mediaBlock: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px',
    height: 300,
    background: theme.palette.common.black7,
    boxSizing: 'border-box',
    borderRadius: 5,
  },
  fileInput: {
    width: 200,
    height: 50,
    border: `1px solid ${theme.palette.common.lightblue}`,
    borderRadius: 6,
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
  },
  back: {
    width: '100%',
  },
  continue: {
    width: '100%',

    '&:disabled': {
      backgroundColor: theme.palette.common.lightblue,
      color: theme.palette.common.white,
      opacity: '.5',
    },
  },
  uploadIcon: {
    marginRight: 10,
    height: 17,
    width: 17,
    verticalAlign: 'middle',
  },
  dropzoneHolder: {
    padding: '16px 30px',
    borderRadius: 6,
    border: `1px solid ${theme.palette.common.lightblue}`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  contentHolder: {
    marginBottom: 40,
  },
  chevronLeft: {
    marginRight: 7,
  },
  logoPreview: {
    maxWidth: 230,
    maxHeight: 190,
    backgroundSize: 'cover',
    width: 'auto',
    height: 'auto',
  },
  pageButton: {
    display: 'inline-block',
    padding: 2,
    minWidth: 30,
    minHeight: '14px !important',
    border: `1px solid ${theme.palette.common.black7}`,
    color: theme.palette.common.black90,
    marginRight: 10,
    verticalAlign: 'text-top',
    marginBottom: 10,
    '&> span': {
      display: 'flex !important',
    },
  },
  activePageButton: {
    border: `1px solid ${theme.palette.common.lightblue}`,
  },
  pageButtonsHolder: {
    display: 'flex',
    marginBottom: 10,
  },
  deleteButtonWrap: {
    position: 'absolute',
    top: 0,
    right: 0,

    '&.MuiIconButton-label': {
      color: theme.palette.common.red,
    },
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.common.red,
  },
}));
