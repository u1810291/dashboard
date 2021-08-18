import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
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
    marginBottom: '16px',
  },
  innerTitle: {
    marginBottom: '6px',
  },
  subtitle: {
    color: '#8392B8',
    maxWidth: '300px',
  },
  uploadBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px',
    marginBottom: '10px',
    height: '300px',
    border: '1px dashed #CBD2E2',
    boxSizing: 'border-box',
    borderRadius: '5px',
  },
  fileInput: {
    width: '200px',
    height: '50px',
    border: '1px solid #507DED',
    borderRadius: '6px',
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
      backgroundColor: '#507DED',
      color: '#FFFFFF',
      opacity: '.5',
    },
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
    border: '1px solid #507DED',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  contentHolder: {
    marginBottom: '40px',
  },
  chevronLeft: {
    marginRight: '7px',
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
    padding: '2px',
    minWidth: '30px ',
    minHeight: '14px !important',
    border: '1px solid #507DED',
    color: '#507DED',
    marginRight: '10px',
    verticalAlign: 'text-top',
    marginBottom: '21px',
    '&> span': {
      display: 'flex !important',
    },
  },
  activePageButton: {
    backgroundColor: '#EBEEFF',
  },
  pageButtonsHolder: {
    display: 'flex',
  },
  deleteButton: {
    display: 'flex !important',
    color: '#FE7581',
    verticalAlign: 'center',
    justifyContent: 'center !important',
  },
}));
