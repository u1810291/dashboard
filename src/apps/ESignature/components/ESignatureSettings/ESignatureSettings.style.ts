import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    '& label': {
      alignItems: 'flex-start',
    },
  },
  rootDisabled: {
    opacity: '30%',
    '& *': {
      cursor: 'default',
    },
  },
  uploadButton: {
    width: '100%',
  },
  uploadInput: {
    display: 'none',
  },
  fileName: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  fileIcon: {
    height: 40,
    width: 40,
  },
  fileGrid: {
    widht: '100%',
    height: '100%',
  },
  fileIconSvg: {
    cursor: 'pointer',
  },
  fileIconDrag: {
    cursor: 'grab',
  },
  'fileIconDrag:hover': {
    cursor: 'grabbing',
  },
}));
